#!/usr/bin/env python3
"""Compose the SHFT ROBOTICS lockup from the master wordmark vector.

The master wordmark (`wordmark.svg`) is the authoritative SHFT + bolt artwork.
The ROBOTICS subtitle only ever existed as a raster (`wordmark-robotics-official.png`),
so `_robotics-vector-src.svg` holds a regularised vector of those letterforms rebuilt
from that master raster: every edge snapped to a 45-degree multiple and least-squares
fitted to the source boundary (0.93% pixel deviation from the raster).

The official lockup runs the bolt's tail down THROUGH the ROBOTICS line, between
"ROBO" and "TICS". This reproduces that: letters are tracked evenly except for one
wide split after the fourth letter, and the line is positioned so that split lands
on the bolt tail. Ratios below are measured off the official lockup art
(Official_SHFT_Logo.jpeg and wordmark-robotics-official.png) and are expressed
against the SHFT cap height so they hold at any scale.
"""
import re, sys, pathlib

HERE = pathlib.Path(__file__).resolve().parent
ASSETS = HERE.parent

# --- master wordmark geometry, measured from an 8px/unit render of wordmark.svg ---
# viewBox of wordmark.svg is "0 0 2175.5 1079"; the artwork's tight box is "124 126 1927 827".
LETTERS = dict(x0=124.88, x1=2050.62, y0=414.75, y1=725.44)   # SHFT letterforms only
BOLT    = dict(x0=899.81, x1=1388.56, y0=157.12, y1=982.81)   # the bolt

# --- ROBOTICS proportions, as multiples of the SHFT cap height ---
ROBOTICS_CAP_R   = 0.2263      # ROBOTICS cap height
ROBOTICS_TRACK_R = 0.3263      # gap between adjacent letters
ROBOTICS_SPLIT_R = 0.7737      # the wide gap the bolt tail passes through
ROBOTICS_DROP_R  = 0.2368      # SHFT baseline down to ROBOTICS cap top
SPLIT_AFTER      = 4           # ROBO | TICS


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


def bolt_x_at(y):
    """x range of the bolt polygon at scanline y, read from the master."""
    d = re.search(r'<path class="cls-1" d="([^"]+)"', (ASSETS / 'wordmark.svg').read_text()).group(1)
    P = [tuple(map(float, m.split(','))) for m in re.findall(r'(-?[\d.]+,-?[\d.]+)', d)]
    xs = []
    for (x1, y1), (x2, y2) in zip(P, P[1:] + P[:1]):
        if (y1 - y) * (y2 - y) <= 0 and y1 != y2:
            xs.append(x1 + (x2 - x1) * (y - y1) / (y2 - y1))
    return (min(xs), max(xs)) if xs else None


def build():
    letters = load_robotics()
    if len(letters) != 8:
        sys.exit(f"expected 8 ROBOTICS letters, grouped {len(letters)}")

    # ROBOTICS cap height and tracking both scale off the SHFT letterform height, so
    # the subtitle keeps its weight relative to the wordmark rather than being
    # stretched to fit.
    shft_h = LETTERS['y1'] - LETTERS['y0']
    src_h = max(g['y1'] for g in letters) - min(g['y0'] for g in letters)
    scale = (ROBOTICS_CAP_R * shft_h) / src_h

    gap = ROBOTICS_TRACK_R * shft_h
    split = ROBOTICS_SPLIT_R * shft_h
    widths = [(g['x1'] - g['x0']) * scale for g in letters]
    gaps = [split if i == SPLIT_AFTER - 1 else gap for i in range(len(letters) - 1)]
    total_w = sum(widths) + sum(gaps)

    top = LETTERS['y1'] + ROBOTICS_DROP_R * shft_h
    y_src_top = min(g['y0'] for g in letters)
    bottom = top + (max(g['y1'] for g in letters) - y_src_top) * scale

    # Put the split on the bolt: centre the wide gap on the bolt tail, measured at the
    # vertical middle of the ROBOTICS line.
    span = bolt_x_at((top + bottom) / 2)
    if span is None:
        sys.exit('bolt does not reach the ROBOTICS line')
    split_centre = sum(span) / 2
    left_of_split = sum(widths[:SPLIT_AFTER]) + sum(gaps[:SPLIT_AFTER - 1])
    cursor = split_centre - split / 2 - left_of_split

    out, x = [], cursor
    for i, g in enumerate(letters):
        tx = x - g['x0'] * scale
        ty = top - y_src_top * scale
        out += [xform(sp, scale, scale, tx, ty) for sp in g['sps']]
        x += widths[i] + (gaps[i] if i < len(gaps) else 0)

    return ' '.join(out), dict(
        x0=min(LETTERS['x0'], cursor), x1=max(LETTERS['x1'], cursor + total_w),
        y0=BOLT['y0'], y1=max(bottom, BOLT['y1']),
        cap=ROBOTICS_CAP_R * shft_h, gap=gap, split=split, width=total_w)


if __name__ == '__main__':
    d, meta = build()
    print(f"ROBOTICS line: cap {meta['cap']:.1f}u  tracking {meta['gap']:.1f}u  "
          f"split {meta['split']:.1f}u  width {meta['width']:.1f}u\n"
          f"lockup box {meta['x0']:.1f},{meta['y0']:.1f} .. {meta['x1']:.1f},{meta['y1']:.1f}")
