<?php
class UserController {
    private $userModel;

    public function __construct($db) {
        $this->userModel = new User($db);
    }

    public function getUser($id) {
        $user = $this->userModel->getUser($id);
        if ($user !== null) {
            http_response_code(200);
            echo json_encode($user->toArray());
        } else {
            http_response_code(404);
            echo json_encode(array("message" => "Пользователь не найден"));
        }
    }

    public function getAllUsers() {
        $users = $this->userModel->getAllUsers();
        $usersArray = array();
        foreach ($users as $user) {
            $usersArray[] = $user->toArray();
        }
        http_response_code(200);
        echo json_encode($usersArray);
    }

    public function createUser($data) {
        if (!empty($data->name) && !empty($data->role)) {
            $this->userModel->id = uniqid();
            $this->userModel->name = $data->name;
            $this->userModel->role = $data->role;
            $this->userModel->login = $data->login ?? null;
            $this->userModel->password = $data->password ?? 'password';

            if ($this->userModel->create()) {
                http_response_code(201);
                echo json_encode($this->userModel->toArray());
            } else {
                http_response_code(503);
                echo json_encode(array("message" => "Невозможно создать пользователя"));
            }
        } else {
            http_response_code(400);
            echo json_encode(array("message" => "Неполные данные"));
        }
    }

    public function updateUser($id, $data) {
        $user = $this->userModel->getUser($id);
        if ($user !== null) {
            $user->name = $data->name ?? $user->name;
            $user->role = $data->role ?? $user->role;

            if ($user->update()) {
                http_response_code(200);
                echo json_encode($user->toArray());
            } else {
                http_response_code(503);
                echo json_encode(array("message" => "Невозможно обновить пользователя"));
            }
        } else {
            http_response_code(404);
            echo json_encode(array("message" => "Пользователь не найден"));
        }
    }

    public function deleteUser($id) {
        $user = $this->userModel->getUser($id);
        if ($user !== null) {
            if ($user->delete()) {
                http_response_code(200);
                echo json_encode(array("message" => "Пользователь удален"));
            } else {
                http_response_code(503);
                echo json_encode(array("message" => "Невозможно удалить пользователя"));
            }
        } else {
            http_response_code(404);
            echo json_encode(array("message" => "Пользователь не найден"));
        }
    }
}
?>