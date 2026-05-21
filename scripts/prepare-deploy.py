#!/usr/bin/env python3
"""
Prepares a clean deployment build by stripping Manus-specific runtime 
injections from the built index.html.
"""
import re
import os

index_path = os.path.join(os.path.dirname(__file__), '..', 'dist', 'public', 'index.html')
index_path = os.path.abspath(index_path)

with open(index_path, 'r', encoding='utf-8') as f:
    content = f.read()

original_size = len(content)

# Remove the manus-runtime inline script block
content = re.sub(r'<script id="manus-runtime">.*?</script>\s*', '', content, flags=re.DOTALL)

# Remove the debug-collector script tag
content = re.sub(r'<script\s[^>]*src="/__manus__/debug-collector\.js"[^>]*></script>\s*', '', content, flags=re.DOTALL)

new_size = len(content)
print(f"Cleaned index.html: {original_size} bytes -> {new_size} bytes (removed {original_size - new_size} bytes of Manus runtime)")

with open(index_path, 'w', encoding='utf-8') as f:
    f.write(content)

print("Done! index.html is ready for deployment.")
