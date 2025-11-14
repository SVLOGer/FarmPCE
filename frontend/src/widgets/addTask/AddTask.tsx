import {Button, Modal, Typography} from "antd";
import styles from "./AddTask.module.css";
import {TaskAppoint} from "../taskAppoint/TaskAppoint.tsx";
import React from "react";
import type {TaskData} from "../../shared/types";
import {useAppSelector} from "../../shared/hooks";

interface AddTaskProps {
    tasks: TaskData[]
    isAddTaskOpen: boolean
    closeAddTask: () => void
    employerId: string
}

const AddTask: React.FC<AddTaskProps> = ({
                                             tasks,
                                             isAddTaskOpen,
                                             closeAddTask,
                                             employerId,
}) => {
    const {users} = useAppSelector(state => state.users)

    const employer = users.find(user => user.id === employerId)

    const handleAddTask = () => {
        console.log('add')
    }

    return (
        <Modal
            title={<Typography.Title level={2} style={{textAlign: 'center'}}>Назначенные задачи</Typography.Title>}
            open={isAddTaskOpen}
            onCancel={closeAddTask}
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
                    {tasks.map((task) => (
                        <TaskAppoint task={task} employer={employer}/>
                    ))}
                </div>
            </div>
        </Modal>
    )
}

export {AddTask}