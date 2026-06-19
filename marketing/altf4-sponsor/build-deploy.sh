#!/usr/bin/env bash
# Assemble a standalone static site for the ALT-F4 sponsor page, served at the
# root of its own domain (its own Vercel project, isolated from shftrobotics.com).
#
# The page lives in the main Astro site at website/src/pages/altf4/index.astro.
# We build the whole site, then lift the /altf4 page (and the editor, CSS/font
# bundles, and images it uses) into a flat folder whose index.html IS the page.
# Absolute asset paths (/_astro, /images/altf4) are copied to the root as-is;
# the page's own /altf4 nav/anchor links are rewritten to work at the root.
#
# Usage:
#   ./build-deploy.sh            # build + assemble, print the path
#   ./build-deploy.sh --deploy   # build, assemble, deploy to the standalone project
set -euo pipefail

SRC_DIR="$(cd "$(dirname "$0")" && pwd)"                 # marketing/altf4-sponsor
REPO_DIR="$(cd "$SRC_DIR/../.." && pwd)"                 # repo root
WEB_DIR="$REPO_DIR/website"
DIST="$WEB_DIR/dist"
OUT="${OUT_DIR:-${TMPDIR:-/tmp}/altf4-sponsor}"

echo "Building the Astro site..."
( cd "$WEB_DIR" && npm run build >/dev/null )

rm -rf "$OUT"
mkdir -p "$OUT"

# index.html = the /altf4 page, with its in-site /altf4 links rewritten for root.
sed -e 's@"/altf4/brand"@"https://shftrobotics.com/altf4/brand"@g' \
    -e 's@"/altf4#@"#@g' \
    -e 's@"/altf4"@"/"@g' \
    "$DIST/altf4/index.html" > "$OUT/index.html"

# edit.html = the copy editor (its iframe falls back to "/" automatically).
cp "$DIST/altf4/edit.html" "$OUT/"

# Bundles (CSS + self-hosted fonts) and images the page references at root.
cp -R "$DIST/_astro" "$OUT/_astro"
mkdir -p "$OUT/images"
cp -R "$DIST/images/altf4" "$OUT/images/altf4"
# Favicons, harmless if unused.
for f in favicon.svg favicon.ico favicon-32.png favicon-192.png apple-touch-icon.png; do
  [ -f "$DIST/$f" ] && cp "$DIST/$f" "$OUT/"
done

# Published copy override, if it has been saved next to this script.
[ -f "$SRC_DIR/content.json" ] && cp "$SRC_DIR/content.json" "$OUT/"

# No-build static config so Vercel serves the folder as-is.
cat > "$OUT/vercel.json" <<'JSON'
{
  "framework": null,
  "installCommand": "",
  "buildCommand": "",
  "outputDirectory": ".",
  "cleanUrls": false
}
JSON

echo "Built standalone folder: $OUT"
ls -la "$OUT"

if [ "${1:-}" = "--deploy" ]; then
  echo "Deploying to production..."
  ( cd "$OUT" && vercel deploy --prod --yes )
fi
