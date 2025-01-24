<?php

namespace Src\Core;

use PDO;

class Router
{
    private $routes = [];
    private $dependencies = [];

    public function setDependency(string $key, $dependency)
    {
        $this->dependencies[$key] = $dependency;
    }
    public function post($uri, $action)
    {
        $this->routes['POST'][$uri] = $action;
    }

    public function get($uri, $action)
    {
        $this->routes['GET'][$uri] = $action;
    }

    public function put($uri, $action)
    {
        $this->routes['PUT'][$uri] = $action;
    }

    public function delete($uri, $action)
    {
        $this->routes['DELETE'][$uri] = $action;
    }

    public function dispatch()
    {
        $method = $_SERVER['REQUEST_METHOD'];
        $uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);

        if ($method === 'OPTIONS') {
            header('Access-Control-Allow-Origin: *');
            header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
            header('Access-Control-Allow-Headers: Content-Type, Authorization');
            http_response_code(204); 
            exit;
        }
    
        if (isset($this->routes[$method][$uri])) {
            $action = $this->routes[$method][$uri];
            if (is_array($action)) {
                $controller = new $action[0]($this->dependencies[PDO::class]);
                $method = $action[1];
    
                $requestData = json_decode(file_get_contents('php://input'), true) ?? [];
                $controller->$method($requestData);
            } else {
                call_user_func($action);
            }
        } else {
            http_response_code(404);
            echo json_encode(['error' => 'Route not found']);
        }
    }
}
