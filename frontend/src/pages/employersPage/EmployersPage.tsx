import {AddEmployerModal, EmployerRow, Header, Preloader} from "../../widgets";
import {useEffect, useState} from "react";
import styles from './EmployersPage.module.css'
import {Alert, Button} from "antd";
import {useAppDispatch, useAppSelector} from "../../shared/hooks";
import {setUsers} from "../../store/slices/usersSlice.ts";
import {usersAPI} from "../../shared/api";

const EmployersPage = () => {
    const dispatch = useAppDispatch()

    const {isWorkStarted} = useAppSelector(state => state.workStatus)
    const {users} = useAppSelector(state => state.users)
    const {user} = useAppSelector(state => state.user)
    const [isModalOpen, setModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const isHR = user?.role === 2 || user?.role === 1

    useEffect(() => {
        const loadTasks = async () => {
            setIsLoading(true)
            setError(null)
            try {
                const usersData = await usersAPI.getAllUsers()
                dispatch(setUsers(usersData))
            } catch (error) {
                console.error('Failed to load tasks:', error)
                setError('Не удалось загрузить задачи')
            } finally {
                setIsLoading(false)
            }
        }

        loadTasks().catch(console.error)
    }, [dispatch])

    const handleOpenModal = () => {
        setModalOpen(true)
    }

    const handleCloseModal = () => {
        setModalOpen(false)
    }

    if (!isWorkStarted) {
        return (
            <>
                <Header />
            </>
        );
    }

    return (
        <>
            <Header />
            {error && (
                <Alert message={error} type="error" showIcon style={{ marginBottom: 16 }} />
            )}
            {isLoading
            ? <Preloader/>
            : (
                <>
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
                )}
        </>
    );
}

export {
    EmployersPage,
}