import {Button, Card, Typography} from "antd";
import React, {useState} from "react";
import type {TaskData, UserData} from "../../shared/types";
import styles from "./TaskAppoint.module.css";
import {useAppDispatch} from "../../shared/hooks";
import {updateUser} from "../../store/slices/usersSlice.ts";
import {TaskRedact} from "../taskRedact/TaskRedact.tsx";

interface TaskAppointProps {
    task: TaskData
    employer: UserData
}

const TaskAppoint: React.FC<TaskAppointProps> = ({
                                                     task,
                                                     employer,
                                                 }) => {
    const dispatch = useAppDispatch()

    const [isRedact, setIsRedact] = useState(false);

    const handleRedact = () => {
        setIsRedact(true)
    }

    const handleCloseRedact = () => {
        setIsRedact(false)
    }

    const handleDelete = () => {
        const newEmployer: UserData = {
            ...employer,
            assignedTasks: employer.assignedTasks.filter(taskItem => taskItem.id !== task.id)
        }

        dispatch(updateUser({
            id: employer.id,
            data: newEmployer
        }))
    }

    return (
        <>
            <Card
                className={styles.taskCard}
            >
                <div className={styles.cardContent}>
                    <div className={styles.textContent}>
                        <Typography.Text className={styles.taskTitle}>{task.title}</Typography.Text>
                        <Typography.Text className={styles.taskReward}>{task.cost} руб</Typography.Text>
                    </div>
                    <div className={styles.buttons}>
                        <Button
                            type='primary'
                            onClick={handleRedact}
                            size={'large'}
                            style={{
                                fontSize: '18px',
                            }}
                        >
                            Редактировать
                        </Button>
                        <Button
                            type='primary'
                            onClick={handleDelete}
                            size={'large'}
                            style={{
                                fontSize: '18px',
                            }}
                            danger
                        >
                            Удалить
                        </Button>
                    </div>
                </div>
            </Card>
            <TaskRedact
                task={task}
                isRedact={isRedact}
                closeRedact={handleCloseRedact}
            />
        </>
    );
};

export {TaskAppoint}