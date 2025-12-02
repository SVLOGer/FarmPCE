<?php
class TaskController {
    private $taskModel;

    public function __construct($db) {
        $this->taskModel = new Task($db);
    }

    public function getAllTasks() {
        $tasks = $this->taskModel->getAllTasks();
        http_response_code(200);
        echo json_encode($tasks);
    }

    public function createTask($data) {
        if (!empty($data->title) && !empty($data->cost)) {
            $this->taskModel->title = $data->title;
            $this->taskModel->cost = $data->cost;
            $this->taskModel->description = $data->description ?? '';
            $this->taskModel->deadline = $data->deadline ?? null;
            $this->taskModel->requirements = $data->requirements ?? '';

            if ($this->taskModel->create()) {
                http_response_code(201);
                echo json_encode($this->taskModel->toArray());
            } else {
                http_response_code(503);
                echo json_encode(array("message" => "Невозможно создать задачу"));
            }
        } else {
            http_response_code(400);
            echo json_encode(array("message" => "Неполные данные"));
        }
    }

    public function updateTask($id, $data) {
        $this->taskModel->id = $id;
        $this->taskModel->title = $data->title ?? '';
        $this->taskModel->cost = $data->cost ?? 0;
        $this->taskModel->description = $data->description ?? '';
        $this->taskModel->deadline = $data->deadline ?? null;
        $this->taskModel->requirements = $data->requirements ?? '';

        if ($this->taskModel->update()) {
            http_response_code(200);
            echo json_encode($this->taskModel->toArray());
        } else {
            http_response_code(503);
            echo json_encode(array("message" => "Невозможно обновить задачу"));
        }
    }
}
?>