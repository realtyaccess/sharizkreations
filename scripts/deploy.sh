#!/bin/bash
set -e
DEPLOYPATH="/home2/esacunmy/public_html/website_339c2246"
REPOPATH="/home2/esacunmy/sharizkreations-repo"

echo "Deploying to: $DEPLOYPATH"
mkdir -p "$DEPLOYPATH"
rm -rf "$DEPLOYPATH/assets"
rm -f "$DEPLOYPATH/index.html"
cp -f "$REPOPATH/dist/public/index.html" "$DEPLOYPATH/index.html"
cp -rf "$REPOPATH/dist/public/assets" "$DEPLOYPATH/assets"
cp -f "$REPOPATH/dist/public/.htaccess" "$DEPLOYPATH/.htaccess"
echo "Deploy complete! Files in $DEPLOYPATH:"
ls -la "$DEPLOYPATH/"
