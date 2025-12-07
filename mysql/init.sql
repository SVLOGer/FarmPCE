SET NAMES utf8mb4;
SET CHARACTER SET utf8mb4;
SET collation_connection = 'utf8mb4_unicode_ci';

USE task_management;

CREATE TABLE users (
                       id VARCHAR(50) PRIMARY KEY,
                       name VARCHAR(255) NOT NULL,
                       role INT NOT NULL,
                       login VARCHAR(100) UNIQUE,
                       password VARCHAR(255),
                       created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE tasks (
                       id INT AUTO_INCREMENT PRIMARY KEY,
                       title VARCHAR(255) NOT NULL,
                       cost DECIMAL(10,2) NOT NULL,
                       description TEXT,
                       deadline DATE,
                       requirements TEXT,
                       created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE assigned_tasks (
                                id INT AUTO_INCREMENT PRIMARY KEY,
                                user_id VARCHAR(50) NOT NULL,
                                task_id INT NOT NULL,
                                is_done BOOLEAN DEFAULT FALSE,
                                assigned_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                                FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
                                FOREIGN KEY (task_id) REFERENCES tasks(id) ON DELETE CASCADE,
                                UNIQUE KEY unique_assignment (user_id, task_id)
);

INSERT INTO users (id, name, role, login, password) VALUES
                                                        ('1', 'Иванов Дмитрий Николаевич', 1, 'admin', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi'),
                                                        ('2', 'Иванов Максим Андреевич', 2, 'hr', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi'),
                                                        ('3', 'Петров Петр Иванович', 3, 'worker1', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi'),
                                                        ('1', 'Попов Михал Михалыч', 4, 'worker2', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi');