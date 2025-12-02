import {Input, Button, Typography, Form} from 'antd'
import {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import styles from './Authorization.module.css'
import {EmployersRoute, TasksRoute} from '../../shared/routes'
import {useAppDispatch} from "../../shared/hooks";
import {authAPI} from "../../shared/api";
import {setUser} from "../../store/slices/userSlice.ts";

const Authorization = () => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')

    const handleLogin = async () => {
        try {
            const user = await authAPI.login({ login, password });
            dispatch(setUser(user));
            if (user?.role === 2 || user?.role === 3) {
                navigate(TasksRoute.path)
            } else {
                navigate(EmployersRoute.path)
            }
        } catch (error) {
            console.error('Login failed:', error);
        }
    };

    return (
        <div className={styles.container}>
            <Typography.Title
                level={1}
            >
                {'Введите логин и пароль или отсканируйте карту'}
            </Typography.Title>
            <Form className={styles.form} onFinish={handleLogin}>
                <Form.Item
                    label='Логин'
                    name='login'
                    rules={[{required: true, message: 'Введите ваш логин'}]}
                    labelCol={{ span: 24 }}
                >
                    <Input
                        size='large'
                        value={login}
                        onChange={e => setLogin(e.target.value)}
                        placeholder='Введите ваш логин'
                        style={{
                            height: '50px',
                            fontSize: '16px',
                            borderRadius: '8px'
                        }}
                    />
                </Form.Item>
                <Form.Item
                    label='Пароль'
                    name='password'
                    rules={[{required: true, message: 'Введите ваш пароль'}]}
                    labelCol={{ span: 24 }}
                >
                    <Input.Password
                        size='large'
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        visibilityToggle
                        placeholder='Введите ваш пароль'
                        style={{
                            height: '50px',
                            fontSize: '16px',
                            borderRadius: '8px'
                        }}
                    />
                </Form.Item>
                <Form.Item className={styles.buttonContainer}>
                    <Button
                        type='primary'
                        htmlType='submit'
                        size='large'
                        style={{
                            height: '50px',
                            fontSize: '18px',
                            minWidth: '200px',
                            borderRadius: '8px'
                        }}
                    >
                        {'Войти'}
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export {
    Authorization,
}