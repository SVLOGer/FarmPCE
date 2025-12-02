<?php
class User {
    private $conn;
    private $table_name = "users";

    public $id;
    public $name;
    public $role;
    public $login;
    public $password;
    public $assignedTasks;

    public function __construct($db) {
        $this->conn = $db;
    }

    public function getUser($id) {
        $query = "SELECT id, name, role, login FROM " . $this->table_name . " WHERE id = ? LIMIT 1";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(1, $id);
        $stmt->execute();

        if ($stmt->rowCount() > 0) {
            $row = $stmt->fetch(PDO::FETCH_ASSOC);
            $this->id = $row['id'];
            $this->name = $row['name'];
            $this->role = $row['role'];
            $this->login = $row['login'];

            $this->getAssignedTasks();
            return $this;
        }
        return null;
    }

    public function getUserByLogin($login) {
        $query = "SELECT id, name, role, login, password FROM " . $this->table_name . " WHERE login = ? LIMIT 1";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(1, $login);
        $stmt->execute();

        if ($stmt->rowCount() > 0) {
            $row = $stmt->fetch(PDO::FETCH_ASSOC);
            $this->id = $row['id'];
            $this->name = $row['name'];
            $this->role = $row['role'];
            $this->login = $row['login'];
            $this->password = $row['password'];

            $this->getAssignedTasks();
            return $this;
        }
        return null;
    }

    public function getAllUsers() {
        $query = "SELECT id, name, role, login FROM " . $this->table_name;
        $stmt = $this->conn->prepare($query);
        $stmt->execute();

        $users = array();
        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            $user = new User($this->conn);
            $user->id = $row['id'];
            $user->name = $row['name'];
            $user->role = $row['role'];
            $user->getAssignedTasks();
            $users[] = $user;
        }
        return $users;
    }

    public function create() {
        $query = "INSERT INTO " . $this->table_name . " SET id=:id, name=:name, role=:role, login=:login, password=:password";
        $stmt = $this->conn->prepare($query);

        $stmt->bindParam(":id", $this->id);
        $stmt->bindParam(":name", $this->name);
        $stmt->bindParam(":role", $this->role);
        $stmt->bindParam(":login", $this->login);
        $stmt->bindParam(":password", password_hash($this->password, PASSWORD_DEFAULT));

        if ($stmt->execute()) {
            return true;
        }
        return false;
    }

    public function update() {
        $query = "UPDATE " . $this->table_name . " SET name=:name, role=:role WHERE id=:id";
        $stmt = $this->conn->prepare($query);

        $stmt->bindParam(":name", $this->name);
        $stmt->bindParam(":role", $this->role);
        $stmt->bindParam(":id", $this->id);

        if ($stmt->execute()) {
            return true;
        }
        return false;
    }

    public function delete() {
        $query = "DELETE FROM " . $this->table_name . " WHERE id = ?";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(1, $this->id);

        if ($stmt->execute()) {
            return true;
        }
        return false;
    }

    private function getAssignedTasks() {
        $query = "SELECT at.task_id as id, at.is_done as isDone 
                  FROM assigned_tasks at 
                  WHERE at.user_id = ?";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(1, $this->id);
        $stmt->execute();

        $this->assignedTasks = array();
        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            $this->assignedTasks[] = array(
                'id' => (int)$row['id'],
                'isDone' => (bool)$row['isDone']
            );
        }
    }

    public function toArray() {
        $name = $this->name;

        if (mb_detect_encoding($name, 'UTF-8', true) === false) {
            $name = mb_convert_encoding($name, 'UTF-8', 'UTF-8');
        }

        return array(
            'id' => $this->id,
            'name' => $name,
            'role' => (int)$this->role,
            'assignedTasks' => $this->assignedTasks
        );
    }
}
?>