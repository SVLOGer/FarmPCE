import {Button, Modal, Typography} from "antd";
import React, {useMemo, useState} from "react";
import styles from './EmployerTasks.module.css'
import {TaskAppoint} from "../taskAppoint/TaskAppoint.tsx";
import {useAppSelector} from "../../shared/hooks";
import {AddTask} from "../addTask/AddTask.tsx";

interface EmployerTasksProps {
    isTasksOpen: boolean
    closeTasks: () => void
    employerId: string
}

const EmployerTasks: React.FC<EmployerTasksProps> = ({
                                                         isTasksOpen,
                                                         closeTasks,
                                                         employerId,
}) => {
    const {tasks} = useAppSelector(state => state.tasks)
    const {users} = useAppSelector(state => state.users)
    const [isAddTask, setIsAddTask] = useState<boolean>(false)

    const employer = users.find(user => user.id === employerId)

    const userTasks = useMemo(() => {
        if (!employer) return []
        return employer.assignedTasks.map(assignedTask => {
            return tasks.find(task => task.id === assignedTask.id)
        }).filter(task => task !== undefined) || []
    }, [employer, tasks])

    const canAddedTasks = useMemo(() => {
        if (!employer) return []
        return tasks.filter(task =>
            !employer.assignedTasks.some(assignedTask => assignedTask.id === task.id)
        );
    }, [employer, tasks])

    console.log(canAddedTasks, employer)

    const handleAddTask = () => {
        setIsAddTask(true)
    }

    const handleCloseAddTask = () => {
        setIsAddTask(false)
    }

    return (
        <>
            <Modal
                title={<Typography.Title level={2} style={{textAlign: 'center'}}>Назначенные задачи</Typography.Title>}
                open={isTasksOpen}
                onCancel={closeTasks}
                footer={null}
                width={1000}
                style={{
                    top: '20px',
                }}
            >
                <div className={styles.tasksContainer}>
                    <Button
                        type='primary'
                        size='large'
                        style={{fontSize: '18px'}}
                        onClick={handleAddTask}
                    >
                        Добавить задачу
                    </Button>
                    <div className={styles.tasks}>
                        {userTasks.map((task) => (
                            <TaskAppoint
                                task={task}
                                employer={employer}
                            />
                        ))}
                    </div>
                </div>
            </Modal>
            <AddTask
                tasks={canAddedTasks}
                isAddTaskOpen={isAddTask}
                closeAddTask={handleCloseAddTask}
                employerId={employerId}
            />
        </>
    )
}

export {EmployerTasks}