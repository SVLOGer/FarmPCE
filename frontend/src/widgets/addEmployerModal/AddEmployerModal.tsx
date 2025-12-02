import React, {useState} from "react";
import {Button, Input, Modal, Typography, message, Select} from "antd";
import styles from "./AddEmployerModal.module.css";
import {addUser} from "../../store/slices/usersSlice.ts";
import {useDispatch} from "react-redux";
import {useAppSelector} from "../../shared/hooks";
import type {UserData} from "../../shared/types";
import {usersAPI} from "../../shared/api";

interface EmployerDetailsProps {
    isModalOpen: boolean
    handleCloseModal: () => void
}

const AddEmployerModal: React.FC<EmployerDetailsProps> = ({
                                                              isModalOpen,
                                                              handleCloseModal,
                                                          }) => {
    const dispatch = useDispatch()
    const [messageApi, contextHolder] = message.useMessage();

    const {users} = useAppSelector(state => state.users)
    const [name, setName] = useState('')
    const [role, setRole] = useState('')
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')

    const getId = (): string => {
        if (users.length === 0) return "1"

        const ids = users.map(item => item.id)
        const numericIds = ids.map(id => parseInt(id)).filter(id => !isNaN(id))

        if (numericIds.length > 0) {
            const maxId = Math.max(...numericIds)
            return (maxId + 1).toString()
        }

        return (users.length + 1).toString()
    }

    const showError = (content: string) => {
        messageApi.error(content);
    };

    const handleAddUser = async () => {
        if (!name.trim()) {
            showError('Введите ФИО сотрудника');
            return;
        }

        const userRole = parseInt(role)
        if (userRole === null) {
            showError('Введите корректную роль: Админ, Кадровик, Работник или Руководитель');
            return;
        }

        const user: UserData = {
            id: getId(),
            name: name.trim(),
            role: userRole,
            login,
            password,
            assignedTasks: [],
        }

        dispatch(addUser(user))
        await usersAPI.createUser(user)
        handleCloseModal()
    }

    const handleCancel = () => {
        handleCloseModal()
    }

    return (
        <>
            {contextHolder}
            <Modal
                title={<Typography.Title level={2} style={{textAlign: 'center'}}>Добавление сотрудника</Typography.Title>}
                open={isModalOpen}
                onCancel={handleCancel}
                footer={null}
                width={800}
                style={{
                    top: '20px',
                }}
            >
                <div className={styles.modalContent}>
                    <div className={styles.inputRow}>
                        <Typography.Text style={{whiteSpace: 'nowrap', fontSize: '18px'}}>ФИО:</Typography.Text>
                        <Input
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Введите ФИО сотрудника"
                            style={{fontSize: '18px'}}
                        />
                    </div>
                    <div className={styles.inputRow}>
                        <Typography.Text style={{whiteSpace: 'nowrap', fontSize: '18px'}}>Роль:</Typography.Text>
                        <Select
                            value={role}
                            onChange={(value) => setRole(value)}
                            placeholder="Выберите роль"
                            style={{fontSize: '18px', width: '100%'}}
                            size="large"
                            options={[
                                { value: '1', label: 'Админ' },
                                { value: '2', label: 'Кадровик' },
                                { value: '3', label: 'Работник' },
                                { value: '4', label: 'Руководитель' },
                            ]}
                        />
                    </div>
                    <div className={styles.inputRow}>
                        <Typography.Text style={{whiteSpace: 'nowrap', fontSize: '18px'}}>Логин:</Typography.Text>
                        <Input
                            value={login}
                            onChange={(e) => setLogin(e.target.value)}
                            placeholder="Введите логин"
                            style={{fontSize: '18px'}}
                        />
                    </div>
                    <div className={styles.inputRow}>
                        <Typography.Text style={{whiteSpace: 'nowrap', fontSize: '18px'}}>Пароль:</Typography.Text>
                        <Input
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Введите пароль"
                            style={{fontSize: '18px'}}
                        />
                    </div>
                    <Button
                        type="primary"
                        size='large'
                        style={{
                            fontSize: '18px',
                        }}
                        onClick={handleAddUser}
                    >
                        Добавить сотрудника
                    </Button>
                </div>
            </Modal>
        </>
    )
}

export {AddEmployerModal}