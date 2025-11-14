import React, {useState} from 'react'
import {Card, Button, Typography} from 'antd'
import styles from './TaskCard.module.css'
import {TaskDetails} from '../taskDetails/TaskDetails.tsx'

interface TaskCardProps {
    title: string
    reward: number
    description: string
    deadline: string
    requirements: string
}

const TaskCard: React.FC<TaskCardProps> = ({title,
                                               reward,
                                               description,
                                               deadline,
                                               requirements,
                                           }) => {
    const [isAccepted, setIsAccepted] = useState(false)
    const [isDetailsOpen, setIsDetailsOpen] = useState(false)

    const onAccept = () => {
        setIsAccepted(!isAccepted)
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
                        <Typography.Text className={styles.taskTitle}>{title}</Typography.Text>
                        <Typography.Text className={styles.taskReward}>{reward} руб</Typography.Text>
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
                title={title}
                reward={reward}
                description={description}
                deadline={deadline}
                requirements={requirements}
                isDetailsOpen={isDetailsOpen}
                closeDetails={closeDetails}
            />
        </>
    )
}

export {TaskCard}