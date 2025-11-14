import {Radio, Space, Typography} from 'antd'
import React from 'react'
import styles from './ReportItem.module.css'

interface ReportItemProps {
    title: string
    isDone: boolean
    onStatusChange: (isDone: boolean) => void
}

const ReportItem: React.FC<ReportItemProps> = ({
                                                   title,
                                                   isDone,
                                                   onStatusChange
                                               }) => {
    const radioValue = isDone ? 'completed' : 'not-completed'

    const handleStatusChange = (value: string) => {
        const newIsDone = value === 'completed'
        onStatusChange(newIsDone)
    }

    return (
        <div className={styles.container}>
            <Typography.Text strong style={{ fontSize: '18px'}}>
                {title}
            </Typography.Text>
            <Radio.Group
                value={radioValue}
                onChange={(e) => handleStatusChange(e.target.value)}
                buttonStyle='solid'
            >
                <Space direction='horizontal' size='middle'>
                    <Radio.Button
                        value='completed'
                        className={`${styles.radioButton} ${radioValue === 'completed' ? styles.completed : ''}`}
                    >
                        Выполнил
                    </Radio.Button>
                    <Radio.Button
                        value='not-completed'
                        className={`${styles.radioButton} ${radioValue === 'not-completed' ? styles.notCompleted : ''}`}
                    >
                        Не выполнил
                    </Radio.Button>
                </Space>
            </Radio.Group>
        </div>
    )
}

export { ReportItem }