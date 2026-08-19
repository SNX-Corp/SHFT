#!/usr/bin/env python3
"""Rebuild the vendor pack on the Desktop from the generated brand pack.

The vendor pack is the same artwork as `website/public/brand/`, renamed into the
folder names the print shop reads. Run build-pack.py first.

    python3 marketing/brand-assets/build/build-pack.py
    python3 marketing/brand-assets/build/build-vendor-pack.py

proof-sheet.png is a 2x screenshot of build/proof-sheet.html (that file carries
the command). README.txt and vector-quality-check.png are hand-written and are
left alone: the quality check crops individual corners and curves, which do not
change when a glyph is only repositioned.
"""
import shutil, sys, pathlib

HERE = pathlib.Path(__file__).resolve().parent
ROOT = HERE.parents[2]
PACK = ROOT / 'website' / 'public' / 'brand'
OUT = pathlib.Path.home() / 'Desktop' / 'SHFT' / 'instant-imprints-pack'

MARKS = {'shft-robotics-lockup': '01-full-logo-shft-robotics',
         'shft-wordmark': '02-wordmark-shft',
         'shft-bolt': '03-bolt'}
WAYS = {'full-on-dark': 'full-color-on-dark', 'full-on-light': 'full-color-on-light',
        'black': 'one-color-black', 'white': 'one-color-white', 'green': 'one-color-green'}
FORMATS = {'svg': 'vector-svg', 'pdf': 'vector-pdf', 'eps': 'vector-eps', 'png': 'raster-png'}


def main():
    if not (PACK / 'shft-logo-pack.zip').exists():
        sys.exit('run build-pack.py first: no pack at ' + str(PACK))
    if not OUT.exists():
        sys.exit('vendor pack folder is missing: ' + str(OUT))

    n = 0
    for mark, folder in MARKS.items():
        for fmt, sub in FORMATS.items():
            d = OUT / folder / sub
            d.mkdir(parents=True, exist_ok=True)
            for way, name in WAYS.items():
                shutil.copy(PACK / fmt / f'{mark}-{way}.{fmt}', d / f'{name}.{fmt}')
                n += 1
    shutil.copy(PACK / 'shft-logo-pack.zip', OUT / 'shft-logo-pack.zip')
    print(f'copied {n} files + the zip into {OUT}')
    print('proof-sheet.png: screenshot build/proof-sheet.html at 2x (see that file)')


if __name__ == '__main__':
    main()
