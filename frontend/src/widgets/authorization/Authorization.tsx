import {Input, Button, Typography, Form} from 'antd'
import {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import styles from './Authorization.module.css'
import {EmployersRoute, LoginRoute, TasksRoute} from '../../shared/routes'
import {useAppSelector} from "../../shared/hooks";

const Authorization = () => {
    const navigate = useNavigate()

    const {user} = useAppSelector(state => state.user)
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = () => {
        if (user.role === 2 || user.role === 3) {
            navigate(TasksRoute.path)
        } else {
            navigate(EmployersRoute.path)
        }
    }

    return (
        <div className={styles.container}>
            <Typography.Title
                level={1}
            >
                {'Введите логин и пароль или отсканируйте карту'}
            </Typography.Title>
            <Form className={styles.form} onFinish={handleSubmit}>
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