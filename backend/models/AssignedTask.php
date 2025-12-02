<?php
class AssignedTask {
    private $conn;
    private $table_name = "assigned_tasks";

    public function __construct($db) {
        $this->conn = $db;
    }

    public function assignTask($user_id, $task_id) {
        $query = "INSERT INTO " . $this->table_name . " (user_id, task_id) VALUES (:user_id, :task_id)";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":user_id", $user_id);
        $stmt->bindParam(":task_id", $task_id);

        return $stmt->execute();
    }

    public function unassignTask($user_id, $task_id) {
        $query = "DELETE FROM " . $this->table_name . " WHERE user_id = :user_id AND task_id = :task_id";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":user_id", $user_id);
        $stmt->bindParam(":task_id", $task_id);

        return $stmt->execute();
    }

    public function updateTaskStatus($user_id, $task_id, $is_done) {
        $query = "UPDATE " . $this->table_name . " SET is_done = :is_done WHERE user_id = :user_id AND task_id = :task_id";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":is_done", $is_done, PDO::PARAM_BOOL);
        $stmt->bindParam(":user_id", $user_id);
        $stmt->bindParam(":task_id", $task_id);

        return $stmt->execute();
    }
}
?>