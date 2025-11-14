import React from 'react'
import { Card, Button, Typography, Divider } from 'antd'
import { useDispatch } from 'react-redux'
import { updateTaskStatus } from '../../store/slices/userSlice'
import { ReportItem } from '../../widgets'
import styles from './EndPage.module.css'
import {useAppSelector} from "../../shared/hooks";

const EndPage = () => {
    const dispatch = useDispatch()

    const {user} = useAppSelector(state => state.user)
    const {tasks} = useAppSelector(state => state.tasks)

    const userTasks = user?.assignedTasks.map(assignedTask => {
        const taskDetails = tasks.find(task => task.id === assignedTask.id)

        return {
            id: assignedTask.id,
            isDone: assignedTask.isDone,
            title: taskDetails?.title,
        }
    }) || []

    const handleFinishWorkDay = () => {
        const completedTasks = userTasks.filter(task => task.isDone)
        const notCompletedTasks = userTasks.filter(task => !task.isDone)

        console.log('Завершенные задачи:', completedTasks)
        console.log('Незавершенные задачи:', notCompletedTasks)
        console.log('Рабочий день завершен')
    }

    const handleTaskStatusChange = (taskId: number, newIsDone: boolean) => {
        dispatch(updateTaskStatus({ taskId, isDone: newIsDone }))
    }

    const completedCount = userTasks.filter(task => task.isDone).length
    const totalCount = userTasks.length

    return (
        <div className={styles.container}>
            <Card
                title={
                    <div style={{ textAlign: 'center' }}>
                        <Typography.Title level={2} style={{ margin: 0 }}>
                            Отчет
                        </Typography.Title>
                        {totalCount > 0 && (
                            <Typography.Text type="secondary">
                                Выполнено: {completedCount} из {totalCount}
                            </Typography.Text>
                        )}
                    </div>
                }
                className={styles.card}
            >
                <div style={{ padding: '0 16px' }}>
                    {userTasks.length > 0 ? (
                        userTasks.map((task, index) => (
                            <div key={task.id}>
                                <ReportItem
                                    title={task.title}
                                    isDone={task.isDone}
                                    onStatusChange={(newIsDone) => handleTaskStatusChange(task.id, newIsDone)}
                                />
                                {index !== userTasks.length - 1 && <Divider/>}
                            </div>
                        ))
                    ) : (
                        <Typography.Text
                            style={{
                                textAlign: 'center',
                                display: 'block',
                                fontSize: '16px',
                                color: '#999'
                            }}
                        >
                            Нет назначенных задач
                        </Typography.Text>
                    )}

                    <div className={styles.endButton}>
                        <Button
                            type='primary'
                            size='large'
                            onClick={handleFinishWorkDay}
                            danger
                            style={{
                                fontSize: '18px',
                            }}
                            disabled={userTasks.length === 0}
                        >
                            Закончить рабочий день
                        </Button>
                    </div>
                </div>
            </Card>
        </div>
    )
}

export { EndPage }