<?php

namespace Src\Controllers;

use PDO;

class CourseController
{
    private PDO $db;

    public function __construct(PDO $db)
    {
        $this->db = $db;
    }

    public function getAllCourses()
    {
        try {
            $stmt = $this->db->prepare("SELECT id, user_id, title, description, thumbnail, new_course FROM courses");
            $stmt->execute();
    
            $courses = $stmt->fetchAll(PDO::FETCH_ASSOC);

            if (ob_get_length()) ob_end_clean();
    
            header('Content-Type: application/json; charset=utf-8');
            http_response_code(200);

            echo json_encode($courses, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
            exit;
        } catch (\PDOException $e) {
            if (ob_get_length()) ob_end_clean();
    
            header('Content-Type: application/json; charset=utf-8');
            http_response_code(500);
    
            echo json_encode([
                'error' => 'Failed to fetch courses.',
                'details' => $e->getMessage(),
            ]);
            exit;
        }
    }
    public function createCourse($data) {
        error_log(print_r($data, true));
        if (empty($data['title']) || empty($data['description']) || empty($data['image'])|| empty($data['user_id'])) {
            http_response_code(400);
            echo json_encode(['error' => 'Missing required fields (title, description, image).']);
            return;
        }
    
        $title = htmlspecialchars($data['title']);
        $description = htmlspecialchars($data['description']);
        $imageBase64 = $data['image'];
        $user_id = $data['user_id'];
    
        try {
            $stmt = $this->db->prepare("SELECT COUNT(*) FROM courses WHERE title = :title");
            $stmt->execute([':title' => $data['title']]);
            $exists = $stmt->fetchColumn();
    
            if ($exists > 0) {
                http_response_code(200);
                echo json_encode(['error' => 'Curso já existe']);
                return;
            }

            $stmt = $this->db->prepare("INSERT INTO courses (user_id, title, description, thumbnail, new_course) VALUES (:user_id, :title, :description, :thumbnail, :new_course)");
            $stmt->execute([
                ':user_id' => $user_id,
                ':title' => $title,
                ':description' => $description,
                ':thumbnail' => $imageBase64,
                ':new_course' => true,
            ]);
    
            http_response_code(201);
            echo json_encode(['message' => 'Course created successfully.']);
        } catch (\PDOException $e) {
            http_response_code(500);
            echo json_encode(['error' => 'Failed to create course.', 'details' => $e->getMessage()]);
        }
    }
}
