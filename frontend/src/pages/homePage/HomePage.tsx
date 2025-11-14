import {Button} from 'antd'
import {useNavigate} from 'react-router-dom'

const HomePage = () => {
    const navigate = useNavigate()

    return (
        <Button
            type='primary'
            htmlType='submit'
            onClick={() => navigate('/login')}
        >
            Войти
        </Button>
    )
}

export {
    HomePage,
}