<?php
class Database {
    private $host = "mysql";
    private $db_name = "task_management";
    private $username = "root";
    private $password = "Uelanrye1746";
    public $conn;

    public function getConnection() {
        $this->conn = null;
        try {
            $dsn = "mysql:host=" . $this->host . ";dbname=" . $this->db_name;
            $this->conn = new PDO($dsn, $this->username, $this->password);

            $this->conn->exec("SET NAMES utf8mb4");
            $this->conn->exec("SET CHARACTER SET utf8mb4");
            $this->conn->exec("SET character_set_client = utf8mb4");
            $this->conn->exec("SET character_set_results = utf8mb4");
            $this->conn->exec("SET character_set_connection = utf8mb4");
            $this->conn->exec("SET collation_connection = utf8mb4_unicode_ci");

            $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        } catch(PDOException $exception) {
            error_log("Connection error: " . $exception->getMessage());
        }
        return $this->conn;
    }
}
?>