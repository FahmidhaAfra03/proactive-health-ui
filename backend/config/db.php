<?php
require_once __DIR__ . '/config.php';

class Database {
    private static $instance = null;
    private $conn;

    private function __construct() {
        $dsn = "mysql:host=" . DB_HOST . ";dbname=" . DB_NAME . ";charset=utf8mb4";
        $options = [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES => false,
        ];
        
        try {
            $this->conn = new PDO($dsn, DB_USER, DB_PASS, $options);
            try {
                $this->conn->query("UPDATE doctors SET experience = '3+ Years' WHERE id = 'dr-b-selvakumar' AND experience = '12+ Years'");
            } catch (PDOException $ex) {
                // Table doctors might not exist yet
            }
        } catch (PDOException $e) {
            // Check if database does not exist (Error code 1049)
            if ($e->getCode() == 1049 || strpos($e->getMessage(), 'Unknown database') !== false) {
                try {
                    // Connect to MySQL server without selecting database
                    $dsn_temp = "mysql:host=" . DB_HOST . ";charset=utf8mb4";
                    $conn_temp = new PDO($dsn_temp, DB_USER, DB_PASS, [
                        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION
                    ]);
                    
                    // Create database
                    $conn_temp->exec("CREATE DATABASE IF NOT EXISTS `" . DB_NAME . "` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci");
                    
                    // Connect to newly created database
                    $this->conn = new PDO($dsn, DB_USER, DB_PASS, $options);
                    
                    // Seed database using schema.sql
                    $schema_file = __DIR__ . '/../../database/schema.sql';
                    if (file_exists($schema_file)) {
                        $sql = file_get_contents($schema_file);
                        
                        // Execute statement by statement
                        $statements = explode(';', $sql);
                        foreach ($statements as $statement) {
                            $trimmed = trim($statement);
                            if (!empty($trimmed)) {
                                $this->conn->exec($trimmed);
                            }
                        }
                    }
                } catch (PDOException $create_error) {
                    header('Content-Type: application/json', true, 500);
                    echo json_encode([
                        'success' => false,
                        'message' => 'Database connection & auto-creation failed: ' . $create_error->getMessage()
                    ]);
                    exit();
                }
            } else {
                header('Content-Type: application/json', true, 500);
                echo json_encode([
                    'success' => false,
                    'message' => 'Database connection failed: ' . $e->getMessage()
                ]);
                exit();
            }
        }
    }

    public static function getInstance() {
        if (self::$instance == null) {
            self::$instance = new Database();
        }
        return self::$instance;
    }

    public function getConnection() {
        return $this->conn;
    }
}
