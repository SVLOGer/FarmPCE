import React, {useState} from 'react'
import {Card, Button, Typography} from 'antd'
import styles from './TaskCard.module.css'
import {TaskDetails} from '../taskDetails/TaskDetails.tsx'
import {useAppDispatch} from "../../shared/hooks";
import {updateTask} from "../../store/slices/tasksSlice.ts";
import type {TaskData} from "../../shared/types";
import {tasksAPI} from "../../shared/api";

interface TaskCardProps {
    task: TaskData
}

const TaskCard: React.FC<TaskCardProps> = ({task}) => {
    const dispatch = useAppDispatch()

    const [isAccepted, setIsAccepted] = useState(task.isTaken)
    const [isDetailsOpen, setIsDetailsOpen] = useState(false)

    const onAccept = async () => {
        setIsAccepted(!isAccepted)
        dispatch(updateTask({
            id: task.id,
            data: {
                ...task,
                isTaken: isAccepted
            }
        }))
        await tasksAPI.updateTask(task.id, {...task, isTaken: isAccepted})
    }
    const openDetails = () => {
        setIsDetailsOpen(true)
    }

    const closeDetails = () => {
        setIsDetailsOpen(false)
    }

    return (
        <>
            <Card
                className={`${styles.taskCard} ${isAccepted ? styles.acceptedCard : ''}`}
            >
                <div className={styles.cardContent}>
                    <div className={styles.textContent}>
                        <Typography.Text className={styles.taskTitle}>{task.title}</Typography.Text>
                        <Typography.Text className={styles.taskReward}>{task.cost} руб</Typography.Text>
                    </div>
                    <div className={styles.buttons}>
                        <Button
                            type='primary'
                            onClick={onAccept}
                            danger={isAccepted}
                            size={'large'}
                            style={{
                                fontSize: '18px',
                            }}
                        >
                            {isAccepted ? 'Отказаться от задачи' : 'Принять задачу'}
                        </Button>
                        <Button
                            type='primary'
                            onClick={openDetails}
                            size={'large'}
                            style={{
                                fontSize: '18px',
                            }}
                        >
                            Подробнее
                        </Button>
                    </div>
                </div>
            </Card>
            <TaskDetails
                title={task.title}
                reward={task.cost}
                description={task.description}
                deadline={task.deadline}
                requirements={task.requirements}
                isDetailsOpen={isDetailsOpen}
                closeDetails={closeDetails}
            />
        </>
    )
}

export {TaskCard}