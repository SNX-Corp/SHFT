#!/usr/bin/env python3
"""Compose the SHFT ROBOTICS lockup from the master wordmark vector.

The master wordmark (`wordmark.svg`) is the authoritative SHFT + bolt artwork.
The ROBOTICS subtitle only ever existed as a raster (`wordmark-robotics-official.png`),
so `_robotics-vector-src.svg` holds a regularised vector of those letterforms rebuilt
from that master raster: every edge snapped to a 45-degree multiple and least-squares
fitted to the source boundary (0.93% pixel deviation from the raster).

This script re-spaces those letters evenly (the raster has a wide gap where the old
oversized bolt cut through the line, which the current compact bolt does not reach)
and locks them under the wordmark.
"""
import re, sys, pathlib

HERE = pathlib.Path(__file__).resolve().parent
ASSETS = HERE.parent

# --- master wordmark geometry, measured from a 4000px render of wordmark-tight.svg ---
# viewBox of wordmark.svg is "0 0 2175.5 1079"; the artwork's tight box is "316 319 1543 441".
LETTERS = dict(x0=316.4, x1=1858.7, y0=385.3, y1=695.8)   # SHFT letterforms only
BOLT    = dict(x0=988.0, x1=1264.2, y0=319.4, y1=759.1)   # the bolt

# --- ROBOTICS proportions taken from the official lockup raster (1178px wide) ---
SHFT_H_IN_RASTER = 191.0       # SHFT letterform height in the official lockup raster
ROBOTICS_CAP_H   = 43.1        # ROBOTICS cap height there
ROBOTICS_TRACK   = 61.0        # even letter gap there
ROBOTICS_DROP    = 44.0        # letters-bottom to ROBOTICS-top there
BOLT_CLEARANCE   = 20.0        # minimum air below the bolt tip, in wordmark units


def subpaths(d):
    return [p.strip() for p in re.split(r'(?=M)', d) if p.strip()]


def pts(sp):
    return [tuple(map(float, m.split(','))) for m in re.findall(r'(-?[\d.]+,-?[\d.]+)', sp)]


def bbox(ps):
    xs = [p[0] for p in ps]; ys = [p[1] for p in ps]
    return min(xs), min(ys), max(xs), max(ys)


def load_robotics():
    src = (ASSETS / '_robotics-vector-src.svg').read_text()
    d = re.search(r'\sd="([^"]+)"', src).group(1)
    sps = [(sp, pts(sp)) for sp in subpaths(d)]
    # group outer contours with their counters by x-overlap
    groups = []
    for sp, ps in sorted(sps, key=lambda t: bbox(t[1])[0]):
        x0, y0, x1, y1 = bbox(ps)
        for g in groups:
            if x0 < g['x1'] and x1 > g['x0']:
                g['x0'] = min(g['x0'], x0); g['x1'] = max(g['x1'], x1)
                g['y0'] = min(g['y0'], y0); g['y1'] = max(g['y1'], y1)
                g['sps'].append(sp)
                break
        else:
            groups.append(dict(x0=x0, y0=y0, x1=x1, y1=y1, sps=[sp]))
    return sorted(groups, key=lambda g: g['x0'])


def xform(sp, sx, sy, tx, ty):
    def f(m):
        x, y = map(float, m.group(0).split(','))
        return f"{x * sx + tx:.3f},{y * sy + ty:.3f}"
    return re.sub(r'-?[\d.]+,-?[\d.]+', f, sp)


def build():
    letters = load_robotics()
    if len(letters) != 8:
        sys.exit(f"expected 8 ROBOTICS letters, grouped {len(letters)}")

    # Hold the official lockup's proportions: ROBOTICS cap height and letter tracking
    # both scale off the SHFT letterform height, so the subtitle keeps its weight
    # relative to the wordmark rather than being stretched to fit.
    shft_h = LETTERS['y1'] - LETTERS['y0']
    src_h = max(g['y1'] for g in letters) - min(g['y0'] for g in letters)
    scale = (ROBOTICS_CAP_H / SHFT_H_IN_RASTER * shft_h) / src_h

    ink = sum((g['x1'] - g['x0']) for g in letters) * scale
    gap = ROBOTICS_TRACK * scale
    total_w = ink + gap * (len(letters) - 1)

    top = max(LETTERS['y1'] + ROBOTICS_DROP / SHFT_H_IN_RASTER * shft_h,
              BOLT['y1'] + BOLT_CLEARANCE)
    y_src_top = min(g['y0'] for g in letters)

    out, cursor = [], LETTERS['x0'] + (LETTERS['x1'] - LETTERS['x0'] - total_w) / 2
    for g in letters:
        w = (g['x1'] - g['x0']) * scale
        tx = cursor - g['x0'] * scale
        ty = top - y_src_top * scale
        out += [xform(sp, scale, scale, tx, ty) for sp in g['sps']]
        cursor += w + gap

    bottom = top + (max(g['y1'] for g in letters) - y_src_top) * scale
    return ' '.join(out), dict(
        x0=LETTERS['x0'], x1=LETTERS['x1'], y0=BOLT['y0'], y1=bottom,
        cap=ROBOTICS_CAP_H / SHFT_H_IN_RASTER * shft_h, gap=gap, width=total_w)


if __name__ == '__main__':
    d, meta = build()
    print(f"ROBOTICS line: cap {meta['cap']:.1f}u  tracking {meta['gap']:.1f}u  "
          f"lockup box {meta['x0']:.1f},{meta['y0']:.1f} .. {meta['x1']:.1f},{meta['y1']:.1f}")
