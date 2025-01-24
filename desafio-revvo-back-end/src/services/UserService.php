<?php

namespace Src\Services;

use Src\Utils\Database;

class UserService {
    public function updateUser(int $userId, array $data) {
        $db = Database::getInstance();

        $query = "UPDATE users SET name = :name, email = :email, password = :password WHERE id = :id";
        $stmt = $db->prepare($query);

        $stmt->bindValue(':name', $data['name']);
        $stmt->bindValue(':email', $data['email']);
        $stmt->bindValue(':password', password_hash($data['password'], PASSWORD_BCRYPT)); // Hash de senha
        $stmt->bindValue(':id', $userId);

        if (!$stmt->execute()) {
            throw new \Exception("Erro ao atualizar os dados do usuário.");
        }

        $query = "SELECT id, name, email FROM users WHERE id = :id";
        $stmt = $db->prepare($query);
        $stmt->bindValue(':id', $userId);
        $stmt->execute();

        $updatedUser = $stmt->fetch(\PDO::FETCH_ASSOC);

        if (!$updatedUser) {
            throw new \Exception("Usuário não encontrado após a atualização.");
        }

        return $updatedUser;
    }
}
