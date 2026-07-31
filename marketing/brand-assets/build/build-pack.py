#!/usr/bin/env python3
"""Generate the SHFT downloadable brand asset pack.

Source of truth is `marketing/brand-assets/wordmark.svg` (the master SHFT + bolt
vector). Everything under `website/public/brand/` is generated from it. Never edit
those files by hand, re-run this script.

    python3 marketing/brand-assets/build/build-pack.py
"""
import json, re, shutil, subprocess, pathlib, sys, tempfile

HERE = pathlib.Path(__file__).resolve().parent
sys.path.insert(0, str(HERE))
import compose_lockup  # noqa: E402
ROOT = HERE.parents[2]
ASSETS = ROOT / 'marketing' / 'brand-assets'
OUT = ROOT / 'website' / 'public' / 'brand'

GREEN, INK, WHITE = '#A6FF00', '#1A1A1A', '#FFFFFF'

# tight artwork boxes in the master viewBox (0 0 2175.5 1079)
WORDMARK_BOX = (316, 319, 1543, 441)          # SHFT + bolt
BOLT_BOX = (988.0, 319.4, 276.2, 439.7)       # bolt alone
PAD = 0  # artwork is delivered trimmed; clear space is documented, not baked in

# colorway -> (letter fill, bolt fill, label)
WAYS = {
    'full-on-dark':  (WHITE, GREEN, 'Full color, for dark garments'),
    'full-on-light': (INK,   GREEN, 'Full color, for light garments'),
    'white':         (WHITE, WHITE, 'One color, white'),
    'black':         (INK,   INK,   'One color, black'),
    'green':         (GREEN, GREEN, 'One color, SHFT green'),
}


def master_shapes():
    """Return (letter_shapes, bolt_shapes) as raw SVG element strings, fill stripped."""
    src = (ASSETS / 'wordmark.svg').read_text()
    letters, bolt = [], []
    for m in re.finditer(r'<(path|polygon)\b[^>]*/>', src):
        el = m.group(0)
        cls = re.search(r'class="([^"]+)"', el).group(1)
        el = re.sub(r'\s*class="[^"]+"', '', el)
        (bolt if cls == 'cls-1' else letters).append(el)
    if not bolt or not letters:
        sys.exit('could not split master wordmark into letters + bolt')
    return letters, bolt


def svg(view, body, title):
    x, y, w, h = view
    return (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="{x} {y} {w} {h}" '
            f'width="{w:.0f}" height="{h:.0f}" role="img" aria-label="{title}">'
            f'<title>{title}</title>{body}</svg>\n')


def fill(el, color):
    return el.replace('<path ', f'<path fill="{color}" ').replace('<polygon ', f'<polygon fill="{color}" ')


def main():
    letters, bolt = master_shapes()
    robotics_d, meta = compose_lockup.build()
    lockup_box = (WORDMARK_BOX[0], WORDMARK_BOX[1], WORDMARK_BOX[2],
                  meta['y1'] - WORDMARK_BOX[1] + 1)

    marks = {
        'shft-wordmark': dict(box=WORDMARK_BOX, letters=letters, bolt=bolt, extra=None,
                              title='SHFT'),
        'shft-robotics-lockup': dict(box=lockup_box, letters=letters, bolt=bolt,
                                     extra=robotics_d, title='SHFT Robotics'),
        'shft-bolt': dict(box=BOLT_BOX, letters=[], bolt=bolt, extra=None,
                          title='SHFT bolt'),
    }

    if OUT.exists():
        shutil.rmtree(OUT)
    for sub in ('svg', 'png', 'pdf', 'eps'):
        (OUT / sub).mkdir(parents=True)

    built = []
    for name, m in marks.items():
        for way, (lc, bc, label) in WAYS.items():
            body = ''.join(fill(e, lc) for e in m['letters'])
            body += ''.join(fill(e, bc) for e in m['bolt'])
            if m['extra']:
                body += f'<path fill="{bc}" fill-rule="evenodd" d="{m["extra"]}"/>'
            stem = f'{name}-{way}'
            p = OUT / 'svg' / f'{stem}.svg'
            p.write_text(svg(m['box'], body, f'{m["title"]} logo'))
            # size PNG/PDF/EPS by the longest side so the tall bolt does not
            # explode into a 4000 x 6400 file
            long_side = '-w' if m['box'][2] >= m['box'][3] else '-h'
            subprocess.run(['rsvg-convert', long_side, '4000', str(p), '-o',
                            str(OUT / 'png' / f'{stem}.png')], check=True)
            subprocess.run(['rsvg-convert', '-f', 'pdf', long_side, '2000', str(p), '-o',
                            str(OUT / 'pdf' / f'{stem}.pdf')], check=True)
            subprocess.run(['rsvg-convert', '-f', 'eps', long_side, '2000', str(p), '-o',
                            str(OUT / 'eps' / f'{stem}.eps')], check=True)
            built.append(dict(mark=name, way=way, label=label, stem=stem,
                              w=round(m['box'][2]), h=round(m['box'][3])))

    (OUT / 'manifest.json').write_text(json.dumps(built, indent=2))
    shutil.copy(HERE / 'READ-ME-FIRST.txt', OUT / 'READ-ME-FIRST.txt')

    # zip from outside OUT, otherwise the archive swallows a partial copy of itself
    with tempfile.TemporaryDirectory() as tmp:
        made = shutil.make_archive(str(pathlib.Path(tmp) / 'shft-logo-pack'), 'zip', OUT)
        shutil.move(made, OUT / 'shft-logo-pack.zip')
    size = (OUT / 'shft-logo-pack.zip').stat().st_size
    print(f'built {len(built)} marks x 4 formats + zip ({size / 1e6:.1f} MB) '
          f'into {OUT.relative_to(ROOT)}')


if __name__ == '__main__':
    main()
