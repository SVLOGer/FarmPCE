import {useEffect, useMemo, useState} from 'react'
import {Header, Preloader, TaskCard} from '../../widgets'
import {Alert, DatePicker, Typography} from 'antd'
import styles from './TaskPage.module.css'
import dayjs, {Dayjs} from 'dayjs'
import {useAppDispatch, useAppSelector} from '../../shared/hooks'
import {tasksAPI} from "../../shared/api";
import {setTasks} from "../../store/slices/tasksSlice.ts";

const TasksPage = () => {
    const dispatch = useAppDispatch()

    const {isWorkStarted} = useAppSelector(state => state.workStatus)
    const {tasks} = useAppSelector(state => state.tasks)
    const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const loadTasks = async () => {
            setIsLoading(true)
            setError(null)
            try {
                const tasksData = await tasksAPI.getAllTasks()
                dispatch(setTasks(tasksData))
            } catch (error) {
                console.error('Failed to load tasks:', error)
                setError('Не удалось загрузить задачи')
            } finally {
                setIsLoading(false)
            }
        }

        loadTasks().catch(console.error)
    }, [dispatch])

    const filteredTasks = useMemo(() => {
        if (!selectedDate) return []

        return tasks.filter(task => {
            const taskDeadline = dayjs(task.deadline, 'YYYY-MM-DD')
            const formattedSelectedDate = selectedDate.format('YYYY-MM-DD')
            const formattedTaskDate = taskDeadline.format('YYYY-MM-DD')
            return formattedTaskDate === formattedSelectedDate
        })
    }, [selectedDate, tasks])

    const disabledDate = (current: dayjs.Dayjs) => {
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
                    {error && (
                        <Alert message={error} type="error" showIcon style={{ marginBottom: 16 }} />
                    )}
                    <DatePicker
                        disabledDate={disabledDate}
                        placeholder='Выберите дату'
                        className={styles.datePicker}
                        size='large'
                        value={selectedDate}
                        onChange={handleDateChange}
                    />
                    {isLoading
                    ? <Preloader/>
                    : selectedDate
                            ? (
                                <div className={styles.tasks}>
                                    {filteredTasks.map((task) => (
                                        <TaskCard
                                            title={task.title}
                                            reward={task.cost}
                                            description={task.description}
                                            deadline={task.deadline}
                                            requirements={task.requirements}
                                        />
                                    ))}
                                </div>
                            ) : <></>
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