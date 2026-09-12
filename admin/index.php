<?php
// Dynamic admin routing fallback for local XAMPP and production Hostinger

$host = $_SERVER['HTTP_HOST'] ?? '';
$isLocal = ($host === 'localhost' || strpos($host, '127.0.0.1') !== false || strpos($host, '192.168.') !== false);

if ($isLocal) {
    // Local: Redirect XAMPP URL to the React dev server port 5173
    header("Location: http://localhost:5173/admin");
    exit();
} else {
    // Production: Serve the React app's index.html to let React Router handle the route
    $indexPath = __DIR__ . '/../index.html';
    if (file_exists($indexPath)) {
        header('Content-Type: text/html');
        readfile($indexPath);
    } else {
        // Fallback redirect to homepage
        header("Location: /");
    }
    exit();
}
