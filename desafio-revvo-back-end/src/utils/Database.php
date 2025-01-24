<?php

namespace Src\Utils;

use PDO;

class Database {
    private static $instance = null;

    public static function getInstance() {
        if (!self::$instance) {
            try {
                
                $host = 'localhost'; 
                $dbname = 'postgres'; 
                $username = 'postgres'; 
                $password = '0000'; 

                self::$instance = new PDO(
                    "pgsql:host=$host;dbname=$dbname", 
                    $username, 
                    $password
                );

                self::$instance->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
                self::$instance->exec("SET NAMES 'utf8';");
            } catch (\PDOException $e) {
                die('Erro de conexão com o banco de dados: ' . $e->getMessage());
            }
        }

        return self::$instance;
    }
}