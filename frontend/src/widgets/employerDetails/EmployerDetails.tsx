import React, {useState} from "react";
import type {UserData} from "../../shared/types";
import {Button, Input, Modal, Typography} from "antd";
import styles from "./EmployerDetail.module.css";
import {useAppSelector} from "../../shared/hooks";
import {EmployerTasks} from "../employerTasks/EmployerTasks.tsx";

interface EmployerDetailsProps {
    user: UserData
    isDetailsOpen: boolean
    closeDetails: () => void
}

const EmployerDetails: React.FC<EmployerDetailsProps> = ({
                                                             user,
                                                             isDetailsOpen,
                                                             closeDetails
}) => {
    const {user: loginedUser} = useAppSelector(state => state.user)
    const [isRedact, setIsRedact] = useState<boolean>(false)
    const [isOpenTasks, setIsOpenTasks] = useState<boolean>(false)
    const [name, setName] = useState(user.name)

    const isChief = loginedUser.role === 4

    const handleRedact = () => {
        setIsRedact(!isRedact)
    }

    const handleOpenTasks = () => {
        setIsOpenTasks(true)
    }

    const handleCloseTasks = () => {
        setIsOpenTasks(false)
    }

    return (
        <>
            <Modal
                title={<Typography.Title level={2} style={{textAlign: 'center'}}>Информация о сотруднике</Typography.Title>}
                open={isDetailsOpen}
                onCancel={closeDetails}
                footer={null}
                width={800}
                style={{
                    top: '20px',
                }}
            >
                <div className={styles.detailsContent}>
                    {isRedact
                        ?
                        <Input
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Введите ФИО сотрудника"
                            style={{fontSize: '24px', width: '50%'}}
                        />
                        :
                        <Typography.Title level={3} style={{marginBlockStart: '5px', marginInlineStart: '5px'}}>{name}</Typography.Title>
                    }
                    <div className={styles.buttons}>
                        <Button
                            type={'primary'}
                            size={'large'}
                            style={{fontSize: '18px'}}
                            onClick={handleRedact}
                        >
                            {isRedact ? 'Сохранить' : 'Редактировать'}
                        </Button>
                        {isChief && (
                            <Button
                                type={'primary'}
                                size={'large'}
                                style={{fontSize: '18px'}}
                                onClick={handleOpenTasks}
                            >
                                Задачи
                            </Button>
                        )}
                    </div>
                </div>
            </Modal>
            <EmployerTasks
                isTasksOpen={isOpenTasks}
                closeTasks={handleCloseTasks}
                employerId={user.id}
            />
        </>
    )
}

export {EmployerDetails}