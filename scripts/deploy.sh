#!/bin/bash
LOG_FILE="$(dirname "$0")/../deploy-debug.log"
exec 2>&1

echo "=== Deploy started at $(date) ===" | tee "$LOG_FILE"
echo "Running as: $(whoami 2>/dev/null || id)" | tee -a "$LOG_FILE"
echo "Working dir: $(pwd)" | tee -a "$LOG_FILE"

DEPLOYPATH="/home2/esacunmy/website-7b890dc7.esa.cun.mybluehost.me/shariz"
REPOPATH="/home2/esacunmy/sharizkreations-repo"

echo "DEPLOYPATH exists: $([ -d "$DEPLOYPATH" ] && echo YES || echo NO)" | tee -a "$LOG_FILE"
echo "DEPLOYPATH writable: $([ -w "$DEPLOYPATH" ] && echo YES || echo NO)" | tee -a "$LOG_FILE"
echo "dist/public exists: $([ -d "$REPOPATH/dist/public" ] && echo YES || echo NO)" | tee -a "$LOG_FILE"

# List the DEPLOYPATH
echo "--- DEPLOYPATH contents ---" | tee -a "$LOG_FILE"
ls -la "$DEPLOYPATH/" 2>&1 | tee -a "$LOG_FILE"

# Try to write a test file
echo "test-$(date +%s)" > "$DEPLOYPATH/deploy-test.txt" 2>&1
echo "Write test exit code: $?" | tee -a "$LOG_FILE"

echo "=== Debug complete ===" | tee -a "$LOG_FILE"

# Now commit the log back to the repo so we can read it
cd "$REPOPATH"
git config user.email "deploy@sharizkreations.com" 2>/dev/null
git config user.name "Deploy Debug" 2>/dev/null
git add deploy-debug.log 2>/dev/null
git commit -m "debug: deploy log [skip ci]" 2>/dev/null
echo "Log committed: $?" | tee -a "$LOG_FILE"
