import styles from './EmployerRow.module.css'
import {Button, Card, Typography} from "antd";
import React, {useState} from "react";
import {EmployerDetails} from "../employerDetails/EmployerDetails.tsx";
import type {UserData} from "../../shared/types";
import {useDispatch} from "react-redux";
import {deleteUser} from "../../store/slices/usersSlice.ts";
import {usersAPI} from "../../shared/api";

interface EmployerRowProps {
    user: UserData
}

const EmployerRow: React.FC<EmployerRowProps> = ({user}) => {
    const dispatch = useDispatch()
    const [isDetailsOpen, setIsDetailsOpen] = useState(false)

    const handleDeleteUser = async () => {
        dispatch(deleteUser(user.id))
        await usersAPI.deleteUser(user.id)
    }

    const openDetails = () => {
        setIsDetailsOpen(true)
    }

    const closeDetails = () => {
        setIsDetailsOpen(false)
    }

    return (
        <>
            <Card className={styles.employerCard}>
                <div className={styles.container}>
                    <Typography.Text strong style={{fontSize: '18px'}}>
                        {user.name}
                    </Typography.Text>
                    <div className={styles.buttons}>
                        <Button
                            type='primary'
                            onClick={handleDeleteUser}
                            danger
                            size={'large'}
                            style={{
                                fontSize: '18px',
                            }}
                        >
                            Уволить
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
            <EmployerDetails
                user={user}
                isDetailsOpen={isDetailsOpen}
                closeDetails={closeDetails}
            />
        </>
    )
}

export {EmployerRow}