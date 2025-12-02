<?php
class AuthController {
    private $userModel;

    public function __construct($db) {
        $this->userModel = new User($db);
    }

    public function login($data) {
        if (!empty($data->login) && !empty($data->password)) {
            $user = $this->userModel->getUserByLogin($data->login);

            if ($user !== null && password_verify($data->password, $user->password)) {
                $userData = $user->toArray();
                http_response_code(200);
                echo json_encode($userData, JSON_UNESCAPED_UNICODE);
            } else {
                http_response_code(401);
                echo json_encode(array("message" => "Неверный логин или пароль"), JSON_UNESCAPED_UNICODE);
            }
        } else {
            http_response_code(400);
            echo json_encode(array("message" => "Необходимо указать логин и пароль"), JSON_UNESCAPED_UNICODE);
        }
    }
}
?>