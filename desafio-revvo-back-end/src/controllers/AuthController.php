<?php

namespace Src\Controllers;

use Exception;
use PDO;
use Src\Services\AuthService;
use Src\Utils\Database;
use Src\Utils\Response;

class AuthController
{
    public function register(): void
    {
        $data = json_decode(file_get_contents('php://input'), true);

        if (!isset($data['name'], $data['email'], $data['password'])) {
            Response::json(['error' => 'Name, email, and password are required'], 400);
            return;
        }

        $hashedPassword = password_hash($data['password'], PASSWORD_BCRYPT);

        $db = Database::getInstance();

        try {
            $stmt = $db->prepare("
            INSERT INTO users (name, email, password)
            VALUES (:name, :email, :password)
        ");
            $stmt->execute([
                ':name' => $data['name'],
                ':email' => $data['email'],
                ':password' => $hashedPassword,
            ]);

            $userId = $db->lastInsertId();
            $userStmt = $db->prepare("SELECT id, name, email FROM users WHERE id = :id");
            $userStmt->execute([':id' => $userId]);
            $user = $userStmt->fetch(PDO::FETCH_ASSOC);

            Response::json([
                'message' => 'User registered successfully',
                'user' => $user
            ], 201);
        } catch (Exception $e) {
            if ($e->getCode() === '23000') {
                Response::json(['error' => 'Email already exists'], 409);
            } else {
                Response::json(['error' => 'An error occurred: ' . $e->getMessage()], 500);
            }
        }
    }



    public function login()
    {
        $data = json_decode(file_get_contents('php://input'), true);

        if (!isset($data['email'], $data['password'])) {
            Response::json(['error' => 'Email and password are required'], 400);
            return;
        }

        $db = Database::getInstance();

        $stmt = $db->prepare("SELECT * FROM users WHERE email = :email");
        $stmt->bindValue(':email', $data['email']);
        $stmt->execute();

        $user = $stmt->fetch(PDO::FETCH_ASSOC);


        if (!$user || !password_verify($data['password'], $user['password'])) {
            Response::json(['error' => 'Invalid credentials'], 401);
            return;
        }

        if (empty($user['token']) || empty($user['refresh_token'])) {
            $accessToken = bin2hex(random_bytes(length: 32));
            $refreshToken = bin2hex(random_bytes(32));

            $updateStmt = $db->prepare("UPDATE users SET token = :token, refresh_token = :refresh_token WHERE id = :id");
            $updateStmt->bindValue(':token', $accessToken);
            $updateStmt->bindValue(':refresh_token', $refreshToken);
            $updateStmt->bindValue(':id', $user['id']);
            $updateStmt->execute();

            $user['token'] = $accessToken;
            $user['refresh_token'] = $refreshToken;
        }

        Response::json([
            'access_token' => $user['token'],
            'refresh_token' => $user['refresh_token'],
            'user' => [
                'id' => $user['id'],
                'name' => $user['name'],
                'email' => $user['email']
            ]
        ], 200);
    }
}
