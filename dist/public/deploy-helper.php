<?php
// One-time deploy helper - delete after use
// Security: only runs if called with correct token
$token = 'shariz-deploy-2026-secure';
if (!isset($_GET['token']) || $_GET['token'] !== $token) {
    http_response_code(403);
    die('Forbidden');
}

$webroot = __DIR__;
$reporoot = '/home2/esacunmy/sharizkreations-repo';
$src = $reporoot . '/dist/public';

$results = [];

// Copy index.html
$r = copy($src . '/index.html', $webroot . '/index.html');
$results[] = 'index.html: ' . ($r ? 'OK' : 'FAILED');

// Copy .htaccess
$r = copy($src . '/.htaccess', $webroot . '/.htaccess');
$results[] = '.htaccess: ' . ($r ? 'OK' : 'FAILED');

// Copy assets directory
function copyDir($src, $dst) {
    if (!is_dir($dst)) mkdir($dst, 0755, true);
    foreach (scandir($src) as $file) {
        if ($file === '.' || $file === '..') continue;
        $s = $src . '/' . $file;
        $d = $dst . '/' . $file;
        if (is_dir($s)) copyDir($s, $d);
        else copy($s, $d);
    }
}

// Remove old assets
array_map('unlink', glob($webroot . '/assets/*'));
rmdir($webroot . '/assets');

copyDir($src . '/assets', $webroot . '/assets');
$results[] = 'assets/: OK';

// Show result
echo "<pre>\n";
echo "Deploy results:\n";
foreach ($results as $r) echo "  $r\n";
echo "\nindex.html content check:\n";
echo htmlspecialchars(file_get_contents($webroot . '/index.html'));
echo "</pre>";
