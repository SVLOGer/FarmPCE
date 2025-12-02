import {Button, DatePicker, Input, Modal, Typography} from 'antd'
import styles from './TaskRedact.module.css'
import React, {useState} from 'react'
import type {TaskData} from "../../shared/types";
import dayjs from "dayjs";
import {useDispatch} from "react-redux";
import {addTask, updateTask} from "../../store/slices/tasksSlice.ts";
import {useAppSelector} from "../../shared/hooks";

interface TaskDetailsProps {
    task?: TaskData
    isRedact: boolean
    closeRedact: () => void
}

const TaskRedact: React.FC<TaskDetailsProps> = ({
                                                     task,
                                                     isRedact,
                                                     closeRedact,
                                                 }) => {
    const dispatch = useDispatch()

    const [title, setTitle] = useState(task?.title || '')
    const [reward, setReward] = useState(task?.cost || null)
    const [description, setDescription] = useState(task?.description || '')
    const [deadline, setDeadline] = useState(task?.deadline || '')
    const [requirements, setRequirements] = useState(task?.requirements || '')
    const {tasks} = useAppSelector(state => state.tasks)

    const handleSave = () => {
        const getNextTaskId = (): number => {
            if (!tasks.length) return 1;
            return Math.max(...tasks.map((task: TaskData)  => task.id)) + 1;
        };

        const newTask: TaskData = {
            id: task?.id || getNextTaskId(),
            title,
            cost: reward || 0,
            description,
            deadline,
            requirements,
        }

        if (task) {
            dispatch(updateTask({
                id: task.id,
                data: newTask,
            }))
        } else {
            dispatch(addTask(newTask))
        }

        closeRedact()
    }

    return (
        <Modal
            title={<Typography.Title level={2} style={{textAlign: 'center'}}>Детали задачи</Typography.Title>}
            open={isRedact}
            onCancel={closeRedact}
            footer={null}
            width={800}
            style={{
                top: '20px',
            }}
        >
            <div className={styles.redactContent}>
                <div className={styles.redactRow}>
                    <Typography.Text className={styles.label}>Название</Typography.Text>
                    <Input
                        size='large'
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        placeholder='Введите название'
                        className={styles.input}
                    />
                </div>
                <div className={styles.redactRow}>
                    <Typography.Text className={styles.label}>Вознаграждение</Typography.Text>
                    <div className={styles.amountGroup}>
                        <Input
                            size='large'
                            type='number'
                            value={reward || 0}
                            onChange={e => setReward(Number(e.target.value))}
                            placeholder='0'
                            className={styles.amountInput}
                            min="0"
                        />
                        <span className={styles.currency}>руб</span>
                    </div>
                </div>
                <div className={styles.redactRow}>
                    <Typography.Text className={styles.label}>Описание</Typography.Text>
                    <Input.TextArea
                        rows={3}
                        size='large'
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                        placeholder='Опишите задачу подробно...'
                        className={styles.textarea}
                    />
                </div>
                <div className={styles.redactRow}>
                    <Typography.Text className={styles.label}>Срок выполнения</Typography.Text>
                    <div className={styles.dateGroup}>
                        <span className={styles.prefix}>до</span>
                        <DatePicker
                            size='large'
                            value={deadline ? dayjs(deadline, 'YYYY-MM-DD', true) : null}
                            onChange={(date) => setDeadline(date ? date.format('YYYY-MM-DD') : '')}
                            placeholder='Выберите дату'
                            className={styles.datePicker}
                            format='DD.MM.YYYY'
                            disabledDate={(current) => {
                                const today = dayjs().startOf('day');
                                const maxDate = dayjs().add(1, 'year').endOf('day');

                                return current < today || current > maxDate;
                            }}
                        />
                    </div>
                </div>
                <div className={styles.redactRow}>
                    <Typography.Text className={styles.label}>Требования</Typography.Text>
                    <Input.TextArea
                        rows={2}
                        size='large'
                        value={requirements}
                        onChange={e => setRequirements(e.target.value)}
                        placeholder='Опишите требования к задаче'
                        className={styles.textarea}
                    />
                </div>

                <div className={styles.buttonContainer}>
                    <Button
                        size='large'
                        type='primary'
                        style={{fontSize: '18px'}}
                        onClick={handleSave}
                    >
                        Сохранить
                    </Button>
                </div>
            </div>
        </Modal>
    )
}

export {TaskRedact}