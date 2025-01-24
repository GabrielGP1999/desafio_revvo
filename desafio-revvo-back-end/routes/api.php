<?php

require_once __DIR__ . '/../vendor/autoload.php';

use Src\Core\Router;
use Src\Utils\Database;
use Src\Utils\Cors;

// Inicializar o roteador
$router = new Router();
$cors = new Cors();

$db = Database::getInstance();
$router->setDependency(key: PDO::class, dependency: $db);
$cors->handleCors();

use Src\Controllers\AuthController;
use Src\Controllers\CourseController;
use Src\Controllers\UserController;

// Rotas relacionadas à autenticação
$router->post(uri: '/register', action: [AuthController::class, 'register']);
$router->post(uri: '/login', action: [AuthController::class, 'login']);

// Rotas relacionadas ao usuário
$router->put(uri: '/user', action: [UserController::class, 'update']);

// Rotas relacionadas aos cursos

$router->get(uri: '/courses', action: [CourseController::class, 'getAllCourses']);
$router->post(uri: '/course', action: [CourseController::class, 'createCourse']);


$router->dispatch();