#!/usr/bin/env python3
"""Rebuild `_robotics-vector-src.svg` from the master ROBOTICS raster.

The ROBOTICS subtitle never existed as a vector. `wordmark-robotics-official.png` is
the cleanest raster we have of it, keyed off the archival `wordmark-official.jpeg`.
This isolates the green ROBOTICS letters from that file (dropping the bolt, which the
old oversized artwork drove through the middle of the line) and rebuilds them as
straight-edged geometry with `regularize.py`.

Run this only if the master raster changes. The output is committed, and
`compose_lockup.py` reads it.

    python3 marketing/brand-assets/build/trace_robotics.py
"""
import pathlib, sys
import numpy as np
from PIL import Image

HERE = pathlib.Path(__file__).resolve().parent
sys.path.insert(0, str(HERE))
from regularize import vectorize  # noqa: E402

ASSETS = HERE.parent
SRC = ASSETS / 'wordmark-robotics-official.png'
OUT = ASSETS / '_robotics-vector-src.svg'

BAND = (0, 375, 1178, 485)   # the ROBOTICS line inside the 1178x510 raster
BOLT = (497, 614)            # x range the bolt passes through
SCALE = 8                    # upscale before tracing, for sub-pixel edge fitting


def main():
    im = Image.open(SRC).convert('RGBA')
    a = np.array(im).astype(int)
    # green is #A6FF00 (blue 0), the SHFT letters are white (blue 255)
    green = (a[..., 3] > 127) & (a[..., 2] < 128)
    mask = Image.fromarray((green * 255).astype(np.uint8)).crop(BAND)
    w, h = mask.size
    big = np.array(mask.resize((w * SCALE, h * SCALE), Image.LANCZOS)) > 127
    big[:, BOLT[0] * SCALE:BOLT[1] * SCALE] = False

    d = vectorize(big, scale=SCALE, eps=5.5, min_edge=12.0, snap45=True)
    OUT.write_text(
        f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w} {h}">'
        f'<path fill="#A6FF00" fill-rule="evenodd" d="{d}"/></svg>\n')

    # report fidelity against the source pixels
    xs = [float(p.split(',')[0]) for p in d.replace('M', ' ').replace('L', ' ')
          .replace('Z', ' ').split() if ',' in p]
    print(f'wrote {OUT.name}: {d.count(",")} vertices, x {min(xs):.1f}..{max(xs):.1f}')


if __name__ == '__main__':
    main()
