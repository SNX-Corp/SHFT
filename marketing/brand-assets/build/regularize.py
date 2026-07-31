#!/usr/bin/env python3
"""Turn a high-resolution silhouette bitmap into clean, straight-edged vector paths.

Autotraced logo art (potrace output) carries one-pixel wobble on every edge, which
shows up as a ragged outline once a garment printer scales it. This rebuilds the
outline instead of smoothing it: simplify the boundary, cluster the edge directions
into the handful of angles the artwork actually uses, least-squares fit each edge to
the pixels it covers at its snapped angle, then intersect neighbours for the corners.

Used by `build-pack.py` for the S-mark and by the ROBOTICS reconstruction.
"""
import numpy as np
from collections import deque


def _contours(mask):
    """Crack-boundary loops (outer and holes) of a boolean mask, in pixel-corner coords."""
    h, w = mask.shape
    edges = {}
    for y in range(h):
        for x in range(w):
            if not mask[y, x]:
                continue
            if y == 0 or not mask[y - 1, x]:     edges.setdefault((x, y), []).append((x + 1, y))
            if x == w - 1 or not mask[y, x + 1]: edges.setdefault((x + 1, y), []).append((x + 1, y + 1))
            if y == h - 1 or not mask[y + 1, x]: edges.setdefault((x + 1, y + 1), []).append((x, y + 1))
            if x == 0 or not mask[y, x - 1]:     edges.setdefault((x, y + 1), []).append((x, y))
    loops = []
    while edges:
        start = next(iter(edges))
        loop, cur = [start], start
        while True:
            nxts = edges.get(cur)
            if not nxts:
                break
            nxt = nxts.pop()
            if not nxts:
                del edges[cur]
            loop.append(nxt)
            cur = nxt
            if cur == start:
                break
        if len(loop) > 4:
            loops.append(loop)
    return loops


def _blobs(mask):
    lab = -np.ones(mask.shape, int)
    out = []
    for y in range(mask.shape[0]):
        for x in range(mask.shape[1]):
            if mask[y, x] and lab[y, x] < 0:
                i = len(out)
                q = deque([(y, x)])
                lab[y, x] = i
                px = []
                while q:
                    cy, cx = q.popleft()
                    px.append((cy, cx))
                    for dy, dx in ((1, 0), (-1, 0), (0, 1), (0, -1)):
                        ny, nx = cy + dy, cx + dx
                        if 0 <= ny < mask.shape[0] and 0 <= nx < mask.shape[1] \
                                and mask[ny, nx] and lab[ny, nx] < 0:
                            lab[ny, nx] = i
                            q.append((ny, nx))
                out.append(px)
    return out


def _simplify(P, eps):
    keep = np.zeros(len(P), bool)
    keep[0] = keep[-1] = True
    stack = [(0, len(P) - 1)]
    while stack:
        a, b = stack.pop()
        if b - a < 2:
            continue
        p0 = P[a]
        d = P[b] - p0
        n = np.hypot(d[0], d[1])
        Q = P[a:b + 1] - p0
        dist = np.hypot(Q[:, 0], Q[:, 1]) if n < 1e-9 else np.abs(d[0] * Q[:, 1] - d[1] * Q[:, 0]) / n
        m = int(np.argmax(dist))
        if dist[m] > eps:
            keep[a + m] = True
            stack += [(a, a + m), (a + m, b)]
    return [i for i in range(len(P)) if keep[i]]


def _angle_set(loops_pts, loops_idx, snap45):
    """The distinct edge directions the artwork uses, as angles in [0, pi)."""
    if snap45:
        return np.arange(8) * np.pi / 4
    hist = np.zeros(360)                       # 0.5-degree bins over 180 degrees
    for P, idx in zip(loops_pts, loops_idx):
        for a, b in zip(idx, idx[1:]):
            v = P[b] - P[a]
            L = float(np.hypot(v[0], v[1]))
            if L < 3:
                continue
            hist[int(np.degrees(np.arctan2(v[1], v[0])) % 180 * 2) % 360] += L
    k = np.arange(-6, 7)
    hist = np.array([np.sum(hist[(np.arange(len(hist))[i] + k) % 360] * np.exp(-(k ** 2) / 8.0))
                     for i in range(len(hist))])
    peaks = [i for i in range(360)
             if hist[i] >= hist[i - 1] and hist[i] >= hist[(i + 1) % 360] and hist[i] > hist.max() * 0.04]
    ang = np.array(sorted(np.radians(p / 2) for p in peaks))
    return np.concatenate([ang, ang + np.pi])


def _fit(P, idx, angles, min_edge):
    D = P.astype(float)
    N = len(D)
    runs = []
    for a, b in zip(idx, idx[1:]):
        span = list(range(a, b + 1)) if b > a else list(range(a, N)) + list(range(0, b + 1))
        v = D[b % N] - D[a]
        th = np.arctan2(v[1], v[0])
        j = int(np.argmin(np.abs(np.angle(np.exp(1j * (th - angles))))))
        if runs and runs[-1][0] == j:
            runs[-1][1] += span
        else:
            runs.append([j, list(span)])
    while len(runs) > 2 and runs[0][0] == runs[-1][0]:
        runs[0][1] = runs[-1][1] + runs[0][1]
        runs.pop()

    def lines(rs):
        out = []
        for j, span in rs:
            u = np.array([np.cos(angles[j]), np.sin(angles[j])])
            n = np.array([-u[1], u[0]])
            out.append((n, float(np.mean(D[span] @ n))))
        return out

    def solve(L):
        V = []
        for k in range(len(L)):
            n1, c1 = L[k - 1]
            n2, c2 = L[k]
            A = np.array([n1, n2])
            if abs(np.linalg.det(A)) < 1e-9:
                return None
            V.append(np.linalg.solve(A, np.array([c1, c2])))
        return V

    for _ in range(24):
        V = solve(lines(runs))
        if V is None or len(runs) < 4:
            break
        lens = [np.hypot(*(V[(k + 1) % len(V)] - V[k])) for k in range(len(V))]
        k = int(np.argmin(lens))
        if lens[k] >= min_edge:
            break
        runs[(k - 1) % len(runs)][1] += runs[k % len(runs)][1]
        runs.pop(k % len(runs))
        merged = []
        for j, span in runs:
            if merged and merged[-1][0] == j:
                merged[-1][1] += span
            else:
                merged.append([j, span])
        while len(merged) > 2 and merged[0][0] == merged[-1][0]:
            merged[0][1] = merged[-1][1] + merged[0][1]
            merged.pop()
        runs = merged
    V = solve(lines(runs))
    return V if V else [D[i] for i in idx[:-1]]


def vectorize(mask, scale=1.0, eps=5.5, min_edge=12.0, snap45=False):
    """mask: 2-D boolean array. Returns an SVG path 'd' string in mask-pixels / scale."""
    pad = np.zeros((mask.shape[0] + 2, mask.shape[1] + 2), bool)
    pad[1:-1, 1:-1] = mask
    loops_pts, loops_idx = [], []
    for px in _blobs(pad):
        ys = [p[0] for p in px]
        xs = [p[1] for p in px]
        y0, y1, x0, x1 = min(ys), max(ys), min(xs), max(xs)
        sub = np.zeros((y1 - y0 + 3, x1 - x0 + 3), bool)
        for cy, cx in px:
            sub[cy - y0 + 1, cx - x0 + 1] = True
        for loop in _contours(sub):
            P = np.array([(p[0] + x0 - 1, p[1] + y0 - 1) for p in loop], float)
            idx = _simplify(P, eps)
            if len(idx) >= 4:
                loops_pts.append(P)
                loops_idx.append(idx)
    angles = _angle_set(loops_pts, loops_idx, snap45)
    out = []
    for P, idx in zip(loops_pts, loops_idx):
        V = _fit(P, idx, angles, min_edge)
        pts = [f"{v[0] / scale:.2f},{v[1] / scale:.2f}" for v in V]
        out.append("M" + pts[0] + " L" + " L".join(pts[1:]) + " Z")
    return " ".join(out)
