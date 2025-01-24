<?php

header(header: "Access-Control-Allow-Origin: *");
header(header: "Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header(header: "Access-Control-Allow-Headers: Content-Type, Authorization, Cache-Control, source");
header(header: "Access-Control-Allow-Credentials: true");
header(header: 'Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(response_code: 200, );
    exit;
}

require_once __DIR__ . '/../vendor/autoload.php';
use Src\Core\Router;

$router = new Router();

require_once __DIR__ . '/../routes/api.php';

$router->dispatch();
