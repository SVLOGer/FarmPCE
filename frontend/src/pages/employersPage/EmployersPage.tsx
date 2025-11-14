import {AddEmployerModal, EmployerRow, Header} from "../../widgets";
import React, {useState} from "react";
import styles from './EmployersPage.module.css'
import {Button} from "antd";
import {useAppSelector} from "../../shared/hooks";

const EmployersPage = () => {
    const {isWorkStarted} = useAppSelector(state => state.workStatus)
    const {users} = useAppSelector(state => state.users)
    const {user} = useAppSelector(state => state.user)
    const [isModalOpen, setModalOpen] = useState(false);

    const isHR = user.role === 2

    if (!isWorkStarted) {
        return (
            <>
                <Header />
            </>
        );
    }

    const handleOpenModal = () => {
        setModalOpen(true)
    }

    const handleCloseModal = () => {
        setModalOpen(false)
    }

    return (
        <>
            <Header />
            <div className={styles.container}>
                {isHR && (
                    <div className={styles.addButtonContainer}>
                        <Button
                            type='primary'
                            style={{
                                fontSize: '18px'
                            }}
                            size='large'
                            onClick={handleOpenModal}
                        >
                            Добавить сотрудника
                        </Button>
                    </div>
                )}

                {users.map((user) => (
                    <EmployerRow user={user}/>
                ))}
            </div>

            {isHR && (
                <AddEmployerModal
                    isModalOpen={isModalOpen}
                    handleCloseModal={handleCloseModal}
                />
            )}
        </>
    );
}

export {
    EmployersPage,
}