import {Modal, Typography} from 'antd'
import styles from './TaskDetails.module.css'
import React from 'react'

interface TaskDetailsProps {
    title: string
    reward: number
    description: string
    deadline: string
    requirements: string
    isDetailsOpen: boolean
    closeDetails: () => void
}

const TaskDetails: React.FC<TaskDetailsProps> = ({
                                                     title,
                                                     reward,
                                                     description,
                                                     deadline,
                                                     requirements,
                                                     isDetailsOpen,
                                                     closeDetails,
                                                }) => {
    return (
        <Modal
            title={<Typography.Title level={2} style={{textAlign: 'center'}}>Детали задачи</Typography.Title>}
            open={isDetailsOpen}
            onCancel={closeDetails}
            footer={null}
            width={800}
            style={{
                top: '20px',
            }}
        >
            <div className={styles.detailsContent}>
                <Typography.Title level={2}>{title}</Typography.Title>
                <Typography.Text strong style={{fontSize: '18px'}}>Вознаграждение: {reward} руб</Typography.Text>
                <div className={styles.description}>
                    <Typography.Paragraph style={{fontSize: '18px'}}>
                        {description}
                    </Typography.Paragraph>
                    <div className={styles.detailsList}>
                        <Typography.Text style={{fontSize: '16px'}}><strong>Срок выполнения:</strong> до {deadline}</Typography.Text>
                        <br />
                        <Typography.Text style={{fontSize: '16px'}}><strong>Требования:</strong> {requirements}</Typography.Text>
                    </div>
                </div>
            </div>
        </Modal>
    )
}

export {TaskDetails}