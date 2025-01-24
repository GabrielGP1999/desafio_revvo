<?php

namespace Src\Services;

use Firebase\JWT\JWT;
use Firebase\JWT\Key;
use Src\Utils\Database;

class AuthService {
    private string $secretKey;

    public function __construct() {
        $this->secretKey = getenv('JWT_SECRET') ?: bin2hex(random_bytes(32)); 
    }

    public function register($email, $password): bool|string {
        $db = Database::getInstance();

        $hashedPassword = password_hash($password, PASSWORD_BCRYPT);
        $stmt = $db->prepare("INSERT INTO users (email, password) VALUES (:email, :password)");
        $stmt->execute(['email' => $email, 'password' => $hashedPassword]);

        return $db->lastInsertId();
    }

    public function login($email, $password): string|null {
        $db = Database::getInstance();

        $stmt = $db->prepare("SELECT * FROM users WHERE email = :email");
        $stmt->execute(['email' => $email]);
        $user = $stmt->fetch();

        if ($user && password_verify($password, $user['password'])) {
            return $this->generateToken($user['id']); 
        }

        return null; 
    }

    private function generateToken($userId): string {
        $payload = [
            'iss' => 'http://localhost', 
            'iat' => time(),             
            'exp' => time() + 3600,      
            'userId' => $userId,         
        ];

        return JWT::encode($payload, $this->secretKey, 'HS256');
    }

    public function validateToken(string $token): object|bool {
        try {
            return JWT::decode($token, new Key($this->secretKey, 'HS256'));
        } catch (\Exception $e) {
            return false; 
        }
    }

    public function getUserFromToken(string $token): array|null {
        $decoded = $this->validateToken($token);

        if (!$decoded) {
            return null; 
        }

        $userId = $decoded->userId;

        $db = Database::getInstance();
        $stmt = $db->prepare("SELECT id, email FROM users WHERE id = :id");
        $stmt->execute(['id' => $userId]);

        return $stmt->fetch() ?: null;
    }
}
