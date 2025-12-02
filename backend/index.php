<?php
mb_internal_encoding('UTF-8');
mb_http_output('UTF-8');
ob_start('mb_output_handler');

header("Content-Type: application/json; charset=UTF-8");

require_once 'middleware/CorsMiddleware.php';
CorsMiddleware::handle();

require_once 'config/database.php';
require_once 'models/User.php';
require_once 'models/Task.php';
require_once 'models/AssignedTask.php';

require_once 'controllers/AuthController.php';
require_once 'controllers/UserController.php';
require_once 'controllers/TaskController.php';
require_once 'controllers/AssignedTaskController.php';

$database = new Database();
$db = $database->getConnection();

$method = $_SERVER['REQUEST_METHOD'];
$path = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$path = str_replace('/backend', '', $path);

$input = json_decode(file_get_contents("php://input"));

switch ($path) {
    case '/api/login':
        if ($method == 'POST') {
            $authController = new AuthController($db);
            $authController->login($input);
        }
        break;

    case '/api/user':
        if ($method == 'GET' && isset($_GET['id'])) {
            $userController = new UserController($db);
            $userController->getUser($_GET['id']);
        } else if ($method == 'GET') {
            $userController = new UserController($db);
            $userController->getAllUsers();
        } else if ($method == 'POST') {
            $userController = new UserController($db);
            $userController->createUser($input);
        }
        break;

    case '/api/tasks':
        if ($method == 'GET') {
            $taskController = new TaskController($db);
            $taskController->getAllTasks();
        } else if ($method == 'POST') {
            $taskController = new TaskController($db);
            $taskController->createTask($input);
        }
        break;

    case '/api/task/assign':
        if ($method == 'POST') {
            $assignedTaskController = new AssignedTaskController($db);
            $assignedTaskController->assignTask($input);
        } else if ($method == 'DELETE') {
            $assignedTaskController = new AssignedTaskController($db);
            $assignedTaskController->unassignTask($input);
        }
        break;

    case '/api/task/status':
        if ($method == 'PUT') {
            $assignedTaskController = new AssignedTaskController($db);
            $assignedTaskController->updateTaskStatus($input);
        }
        break;

    default:
        http_response_code(404);
        echo json_encode(array("message" => "Маршрут не найден"));
        break;
}
?>