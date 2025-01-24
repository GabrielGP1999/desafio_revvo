<?php

namespace Src\Controllers;

use Src\Services\UserService;
use Src\Utils\Response;

class UserController
{
    private UserService $userService;

    public function __construct()
    {
        $this->userService = new UserService();
    }

    public function update(): void {
        if (session_status() === PHP_SESSION_NONE) {
            session_start();
        }

        $requestData = json_decode(file_get_contents('php://input'), true);

        if (empty($requestData['id']) || empty($requestData['name']) || empty($requestData['email']) || empty($requestData['password'])) {
            Response::json(data: ['error' => 'Todos os campos são obrigatórios.'], status: 400);
            return;
        }

        try {
            $userId = $requestData['id'];

            $updatedUser = $this->userService->updateUser(userId: $userId, data: $requestData);

            Response::json(data: [
                'message' => 'Dados do usuário atualizados com sucesso.',
                'user' => $updatedUser,
            ], status: 200);
        } catch (\Exception $e) {
            Response::json(data: ['error' => 'Erro ao atualizar os dados: ' . $e->getMessage()], status: 500);
        }
    }
}
