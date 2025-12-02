<?php
class AssignedTaskController {
    private $assignedTaskModel;

    public function __construct($db) {
        $this->assignedTaskModel = new AssignedTask($db);
    }

    public function assignTask($data) {
        if (!empty($data->user_id) && !empty($data->task_id)) {
            if ($this->assignedTaskModel->assignTask($data->user_id, $data->task_id)) {
                http_response_code(200);
                echo json_encode(array("message" => "Задача назначена"));
            } else {
                http_response_code(503);
                echo json_encode(array("message" => "Невозможно назначить задачу"));
            }
        } else {
            http_response_code(400);
            echo json_encode(array("message" => "Неполные данные"));
        }
    }

    public function unassignTask($data) {
        if (!empty($data->user_id) && !empty($data->task_id)) {
            if ($this->assignedTaskModel->unassignTask($data->user_id, $data->task_id)) {
                http_response_code(200);
                echo json_encode(array("message" => "Задача снята"));
            } else {
                http_response_code(503);
                echo json_encode(array("message" => "Невозможно снять задачу"));
            }
        } else {
            http_response_code(400);
            echo json_encode(array("message" => "Неполные данные"));
        }
    }

    public function updateTaskStatus($data) {
        if (!empty($data->user_id) && !empty($data->task_id) && isset($data->is_done)) {
            if ($this->assignedTaskModel->updateTaskStatus($data->user_id, $data->task_id, $data->is_done)) {
                http_response_code(200);
                echo json_encode(array("message" => "Статус задачи обновлен"));
            } else {
                http_response_code(503);
                echo json_encode(array("message" => "Невозможно обновить статус задачи"));
            }
        } else {
            http_response_code(400);
            echo json_encode(array("message" => "Неполные данные"));
        }
    }
}
?>