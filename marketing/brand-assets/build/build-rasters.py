#!/usr/bin/env python3
"""Generate the site + marketing rasters from the master vectors.

Run after any change to `marketing/brand-assets/wordmark*.svg`, and after
`build-pack.py` (the lockup rasters are cut from the pack's lockup SVG).

    python3 marketing/brand-assets/build/build-pack.py
    python3 marketing/brand-assets/build/build-rasters.py

Sizes are pinned to the ARTWORK, not to a canvas, so the mark keeps the same
rendered size when its bounding box changes:

  site logo ....... ink 517px tall + 10px transparent margin (nav, hero and
                    preloader all size the image by height)
  lockup raster ... ink 506px tall, no margin
  og-default ...... lockup 1114px wide, centred on a 1200x630 #1A1A1A card
                    (width-pinned so the card keeps its margins)

Favicons and the bolt-only art are not built here; they do not depend on the
letterforms.
"""
import shutil, subprocess, sys, tempfile, pathlib, re
from PIL import Image

HERE = pathlib.Path(__file__).resolve().parent
ROOT = HERE.parents[2]
ASSETS = ROOT / 'marketing' / 'brand-assets'
PACK = ROOT / 'website' / 'public' / 'brand' / 'svg'

SITE_INK_H = 517      # px of ink; the img is this plus MARGIN on every side
MARGIN = 10
LOCKUP_INK_H = 506
OG = dict(size=(1200, 630), mark_w=1114, bg=(26, 26, 26))


def rsvg(src, out, *args):
    subprocess.run(['rsvg-convert', *args, str(src), '-o', str(out)], check=True)


def ink_box(svg_path, probe_h=1600):
    """Tight artwork box of an SVG, in its own user units."""
    src = pathlib.Path(svg_path).read_text()
    vx, vy, vw, vh = (float(v) for v in
                      re.search(r'viewBox="([^"]+)"', src).group(1).split())
    with tempfile.TemporaryDirectory() as t:
        p = pathlib.Path(t) / 'probe.png'
        rsvg(svg_path, p, '-h', str(probe_h))
        im = Image.open(p).convert('RGBA')
        b = im.getbbox() if im.getchannel('A').getextrema()[1] else None
    if not b:
        sys.exit(f'{svg_path}: no artwork found')
    s = vh / im.height
    return (vx + b[0] * s, vy + b[1] * s, (b[2] - b[0]) * s, (b[3] - b[1]) * s)


def trimmed_svg(src, tmp):
    """Copy of `src` whose viewBox is its tight artwork box."""
    box = ink_box(src)
    out = pathlib.Path(tmp) / (pathlib.Path(src).stem + '-trim.svg')
    out.write_text(re.sub(r'viewBox="[^"]+"',
                          'viewBox="%.3f %.3f %.3f %.3f"' % box,
                          pathlib.Path(src).read_text()))
    return out


def site_logo(src, dest, tmp):
    ink = pathlib.Path(tmp) / (dest.stem + '-ink.png')
    rsvg(trimmed_svg(src, tmp), ink, '-h', str(SITE_INK_H))
    im = Image.open(ink).convert('RGBA')
    out = Image.new('RGBA', (im.width + 2 * MARGIN, im.height + 2 * MARGIN), (0, 0, 0, 0))
    out.paste(im, (MARGIN, MARGIN))
    out.save(dest)
    return out.size


def main():
    with tempfile.TemporaryDirectory() as tmp:
        site = ROOT / 'website' / 'public' / 'images' / 'logo'
        size = site_logo(ASSETS / 'wordmark.svg', site / 'wordmark.png', tmp)
        site_logo(ASSETS / 'wordmark-dark.svg', site / 'wordmark-dark.png', tmp)
        print(f'site wordmark {size[0]}x{size[1]} (ink {SITE_INK_H}px tall)')

        for name in ('wordmark.png', 'wordmark-dark.png'):
            shutil.copy(site / name, ROOT / 'marketing' / '_site' / 'images' / 'logo' / name)
        for d in ('ads', 'merch'):
            shutil.copy(site / 'wordmark.png', ROOT / 'marketing' / d / 'wordmark.png')

        lockup = PACK / 'shft-robotics-lockup-full-on-dark.svg'
        raster = ASSETS / 'wordmark-shft-robotics.png'
        rsvg(trimmed_svg(lockup, tmp), raster, '-h', str(LOCKUP_INK_H))
        print(f'lockup raster {Image.open(raster).size}')

        mark = pathlib.Path(tmp) / 'og-mark.png'
        rsvg(trimmed_svg(lockup, tmp), mark, '-w', str(OG['mark_w']))
        card = Image.new('RGB', OG['size'], OG['bg'])
        m = Image.open(mark).convert('RGBA')
        card.paste(m, ((card.width - m.width) // 2, (card.height - m.height) // 2), m)
        card.save(ROOT / 'website' / 'public' / 'og' / 'og-default.png')
        print(f'og-default {card.size} with a {m.size} mark')


if __name__ == '__main__':
    main()
