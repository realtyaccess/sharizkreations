#!/bin/bash
DEPLOYPATH="/home2/esacunmy/website-7b890dc7.esa.cun.mybluehost.me/shariz"
REPOPATH="/home2/esacunmy/sharizkreations-repo"

# Write debug info as a PHP file to the DEPLOYPATH
# (trying as a NEW file, not overwriting existing ones)
PHP_DEBUG="$DEPLOYPATH/debug-info.php"

cat > "$PHP_DEBUG" << 'PHP'
<?php
echo "<pre>\n";
echo "user: " . get_current_user() . "\n";
echo "uid: " . getmyuid() . "\n";
echo "gid: " . getmygid() . "\n";
echo "webroot: " . __DIR__ . "\n";
echo "writable: " . (is_writable(__DIR__) ? 'YES' : 'NO') . "\n";
echo "\nFiles in webroot:\n";
foreach (scandir(__DIR__) as $f) {
    $path = __DIR__ . '/' . $f;
    $stat = stat($path);
    echo sprintf("  %s %s %s %s\n", 
        decoct($stat['mode']),
        $stat['uid'],
        $stat['gid'],
        $f
    );
}
PHP

echo "PHP debug file write exit: $?"
echo "DEPLOYPATH writable: $([ -w "$DEPLOYPATH" ] && echo YES || echo NO)"
echo "Done"
