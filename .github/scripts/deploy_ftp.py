#!/usr/bin/env python3
"""
FTP deploy script for ShaRiz Kreations -> Bluehost.
Web root: /home2/esacunmy/website-7b890dc7.esa.cun.mybluehost.me/shariz/
FTP relative path: /website-7b890dc7.esa.cun.mybluehost.me/shariz/
Uses active mode FTP to bypass Bluehost's passive port firewall.
"""
import os
import subprocess
import sys
import tempfile

host = os.environ['FTP_HOST']
user = os.environ['FTP_USER']
pwd  = os.environ['FTP_PASS']
remote = '/website-7b890dc7.esa.cun.mybluehost.me/shariz'

# Build lftp script — written as a Python string to avoid YAML colon issues
lines = [
    'set ftp:ssl-allow yes',
    'set ftp:ssl-force yes',
    'set ssl:verify-certificate no',
    'set ftp:passive-mode no',       # ACTIVE mode: bypasses blocked passive ports
    'set net:timeout 60',
    'set net:max-retries 3',
    'set net:reconnect-interval-base 5',
    f'open -u "{user}","{pwd}" ftp://{host}',
    'echo "=== Connected to Bluehost FTP (active mode) ==="',
    f'echo "=== Cleaning old files from {remote}/ ==="',
    f'rm -rf {remote}/assets',
    f'rm -f {remote}/index.html',
    f'rm -f {remote}/.htaccess',
    f'rm -rf {remote}/__manus__',
    f'echo "=== Uploading new build to {remote}/ ==="',
    f'mirror --reverse --verbose --parallel=1 dist/public/ {remote}/',
    'echo "=== Deploy complete! ==="',
]

script = '\n'.join(lines) + '\n'

with tempfile.NamedTemporaryFile(mode='w', suffix='.lftp', delete=False) as f:
    f.write(script)
    script_path = f.name

print(f"lftp script written to {script_path}")
print("--- script contents ---")
# Print with credentials masked
masked = script.replace(pwd, '***').replace(user, '***')
print(masked)
print("--- running lftp ---")

result = subprocess.run(['lftp', '-f', script_path], text=True)
os.unlink(script_path)

if result.returncode != 0:
    print(f"lftp exited with code {result.returncode}", file=sys.stderr)
    sys.exit(result.returncode)

print("Deploy succeeded!")
