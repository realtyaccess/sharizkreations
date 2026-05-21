#!/bin/bash
set -e
DEPLOYPATH="/home2/esacunmy/website-7b890dc7.esa.cun.mybluehost.me/shariz"
REPOPATH="$(cd "$(dirname "$0")/.." && pwd)"
echo "Deploying from: $REPOPATH"
echo "Deploying to: $DEPLOYPATH"
mkdir -p "$DEPLOYPATH"
rm -rf "$DEPLOYPATH/assets"
rm -f "$DEPLOYPATH/index.html"
cp -f "$REPOPATH/dist/public/index.html" "$DEPLOYPATH/index.html"
cp -rf "$REPOPATH/dist/public/assets" "$DEPLOYPATH/assets"
cp -f "$REPOPATH/dist/public/.htaccess" "$DEPLOYPATH/.htaccess"
echo "Deploy complete!"
ls -la "$DEPLOYPATH/"
