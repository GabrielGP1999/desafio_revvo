<?php

namespace Src\Utils;

class Cors
{
    public function handleCors()
    {
        header("Access-Control-Allow-Origin: *");
        header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
        header("Access-Control-Allow-Headers: Content-Type, Authorization");
        header('Content-Type: application/json; charset=utf-8');

        if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
            http_response_code(204); // No Content
            exit;
        }
    }
}
