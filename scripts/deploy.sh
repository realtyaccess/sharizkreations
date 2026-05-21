#!/bin/bash
LOG="/home2/esacunmy/sharizkreations-repo/deploy-debug.log"
echo "=== Deploy started at $(date) ===" > "$LOG"
echo "Running as: $(whoami)" >> "$LOG"
echo "Working dir: $(pwd)" >> "$LOG"
echo "Script dir: $(dirname "$0")" >> "$LOG"

DEPLOYPATH="/home2/esacunmy/website-7b890dc7.esa.cun.mybluehost.me/shariz"
REPOPATH="/home2/esacunmy/sharizkreations-repo"

echo "DEPLOYPATH: $DEPLOYPATH" >> "$LOG"
echo "REPOPATH: $REPOPATH" >> "$LOG"

# Check if DEPLOYPATH exists and is writable
if [ -d "$DEPLOYPATH" ]; then
    echo "DEPLOYPATH exists: YES" >> "$LOG"
    ls -la "$DEPLOYPATH/" >> "$LOG" 2>&1
else
    echo "DEPLOYPATH exists: NO" >> "$LOG"
fi

# Check if REPOPATH/dist/public exists
if [ -d "$REPOPATH/dist/public" ]; then
    echo "dist/public exists: YES" >> "$LOG"
    ls "$REPOPATH/dist/public/" >> "$LOG" 2>&1
else
    echo "dist/public exists: NO" >> "$LOG"
fi

# Try to write a test file to DEPLOYPATH
echo "test" > "$DEPLOYPATH/deploy-test.txt" 2>> "$LOG"
if [ $? -eq 0 ]; then
    echo "Write test: SUCCESS" >> "$LOG"
    rm -f "$DEPLOYPATH/deploy-test.txt"
else
    echo "Write test: FAILED" >> "$LOG"
fi

echo "=== Deploy debug complete ===" >> "$LOG"
cat "$LOG"
