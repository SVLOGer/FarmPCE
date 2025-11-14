import React, {useState} from 'react'
import {Header, TaskCard} from '../../widgets'
import {DatePicker, Typography} from 'antd'
import styles from './TaskPage.module.css'
import dayjs, {Dayjs} from 'dayjs'
import {useAppSelector} from '../../shared/hooks'

const TasksPage = () => {
    const {isWorkStarted} = useAppSelector(state => state.workStatus)
    const {tasks} = useAppSelector(state => state.tasks)
    const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null)

    const disabledDate = (current) => {
        if (!current) {
            return false
        }

        const now = dayjs()
        const minDate = now.subtract(1, 'year')
        const maxDate = now.add(1, 'year')

        return current < minDate.startOf('day') || current > maxDate.endOf('day')
    }

    const handleDateChange = (date: Dayjs | null) => {
        setSelectedDate(date)
        if (date) {
            console.log('Выбранная дата:', date.format('DD.MM.YYYY'))
        }
    }

    return (
        <>
            <Header />
            {isWorkStarted ? (
                <div className={styles.container}>
                    <div className={styles.title}>
                        <Typography.Title>Задачи</Typography.Title>
                    </div>
                    <DatePicker
                        disabledDate={disabledDate}
                        placeholder='Выберите дату'
                        className={styles.datePicker}
                        size='large'
                        value={selectedDate}
                        onChange={handleDateChange}
                    />
                    {selectedDate ? (
                        <div className={styles.tasks}>
                            {tasks.map((task) => (
                                <TaskCard
                                    title={task.title}
                                    reward={task.cost}
                                    description={task.description}
                                    deadline={task.deadline}
                                    requirements={task.requirements}
                                />
                            ))}
                        </div>
                    ) :
                        <></>
                    }

                </div>
            ) : (
                <></>
            )}
        </>
    )
}

export {
    TasksPage,
}