#!/usr/bin/env bash
# Assemble the standalone folder that serves sponsor.shftrobotics.com.
# The live page is sponsor-package.html, but it lives at marketing/sponsors/ and
# references ../brand-assets and ../video. The live site serves the package as the
# root index.html, so those paths are rewritten to be root-relative and the
# referenced assets are copied next to it.
#
# Usage:
#   ./build-deploy.sh            # build the folder, print the path
#   ./build-deploy.sh --deploy   # build, then deploy to the shft-sponsor-deploy Vercel project
set -euo pipefail

SRC_DIR="$(cd "$(dirname "$0")" && pwd)"            # marketing/sponsors
MKT_DIR="$(cd "$SRC_DIR/.." && pwd)"               # marketing
OUT="${OUT_DIR:-${TMPDIR:-/tmp}/sponsor-deploy}"

rm -rf "$OUT"
mkdir -p "$OUT/brand-assets" "$OUT/video"

# index.html = the package, with parent-relative asset paths flattened to root.
sed -e 's#\.\./brand-assets/#brand-assets/#g' \
    -e 's#\.\./video/#video/#g' \
    "$SRC_DIR/sponsor-package.html" > "$OUT/index.html"

# Sibling assets the page references at root.
cp "$SRC_DIR/qr-email.svg"            "$OUT/"
cp "$SRC_DIR/robot-sponsors-2056.jpeg" "$OUT/"
cp "$SRC_DIR/robot-sponsors-1323.jpeg" "$OUT/"

# Parent assets the page references via ../.
cp "$MKT_DIR/brand-assets/wordmark-shft-robotics.png" "$OUT/brand-assets/"
cp "$MKT_DIR/video/tee-sponsors.mp4"                   "$OUT/video/"

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

echo "Built deploy folder: $OUT"
ls -la "$OUT"

if [ "${1:-}" = "--deploy" ]; then
  echo "Deploying to production (shft-sponsor-deploy)..."
  ( cd "$OUT" && vercel deploy --prod --yes )
fi
