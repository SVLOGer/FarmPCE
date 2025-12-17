<?php
class Task {
    private $conn;
    private $table_name = "tasks";

    public $id;
    public $title;
    public $cost;
    public $description;
    public $deadline;
    public $requirements;
    public $isTaken;

    public function __construct($db) {
        $this->conn = $db;
    }

    public function getAllTasks() {
        $query = "SELECT * FROM " . $this->table_name . " ORDER BY id";
        $stmt = $this->conn->prepare($query);
        $stmt->execute();

        $tasks = array();
        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            $task = new Task($this->conn);
            $task->id = (int)$row['id'];
            $task->title = $row['title'];
            $task->cost = (float)$row['cost'];
            $task->description = $row['description'];
            $task->deadline = $row['deadline'];
            $task->requirements = $row['requirements'];
            $tasks[] = $task->toArray();
        }
        return $tasks;
    }

    public function create() {
        $query = "INSERT INTO " . $this->table_name . " 
                  SET title=:title, cost=:cost, description=:description, 
                      deadline=:deadline, requirements=:requirements, isTaken=:isTaken";

        $stmt = $this->conn->prepare($query);

        $stmt->bindParam(":title", $this->title);
        $stmt->bindParam(":cost", $this->cost);
        $stmt->bindParam(":description", $this->description);
        $stmt->bindParam(":deadline", $this->deadline);
        $stmt->bindParam(":requirements", $this->requirements);
        $stmt->bindParam(":isTaken", $this->isTaken);

        if ($stmt->execute()) {
            $this->id = $this->conn->lastInsertId();
            return true;
        }
        return false;
    }

    public function update() {
        $query = "UPDATE " . $this->table_name . " 
                  SET title=:title, cost=:cost, description=:description, 
                      deadline=:deadline, requirements=:requirements, isTaken=:isTaken
                  WHERE id=:id";

        $stmt = $this->conn->prepare($query);

        $stmt->bindParam(":title", $this->title);
        $stmt->bindParam(":cost", $this->cost);
        $stmt->bindParam(":description", $this->description);
        $stmt->bindParam(":deadline", $this->deadline);
        $stmt->bindParam(":requirements", $this->requirements);
        $stmt->bindParam(":isTaken", $this->isTaken);
        $stmt->bindParam(":id", $this->id);

        if ($stmt->execute()) {
            return true;
        }
        return false;
    }

    public function toArray() {
        return array(
            'id' => $this->id,
            'title' => $this->title,
            'cost' => $this->cost,
            'description' => $this->description,
            'deadline' => $this->deadline,
            'requirements' => $this->requirements,
            'isTaken' => $this->isTaken
        );
    }
}
?>