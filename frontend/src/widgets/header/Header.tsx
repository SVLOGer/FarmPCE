import {MenuOutlined} from '@ant-design/icons'
import {Button, Layout, Popover, Menu} from 'antd'
import {useLocation, useNavigate} from 'react-router-dom'
import styles from './Header.module.css'
import {EmployersRoute, EndRoute, TasksRoute} from '../../shared/routes';
import React from 'react';
import type {MenuProps} from 'antd';
import {useAppDispatch, useAppSelector} from '../../shared/hooks';
import {toggleWorkStatus} from '../../store/slices/workStatusSlice.ts';

const usePopoverItems = (role: number): MenuProps['items'] => {
    const navigate = useNavigate()
    const location = useLocation()

    const handleNavigation = (path: string) => () => navigate(path)

    if (role) {
        return [
            {
                key: 'tasks',
                label: 'Задачи',
                onClick: handleNavigation(TasksRoute.path),
                disabled: location.pathname === TasksRoute.path
            },
            {
                key: 'employers',
                label: 'Список сотрудников',
                onClick: handleNavigation(EmployersRoute.path),
                disabled: location.pathname === EmployersRoute.path
            }
        ]
    } else {
        return []
    }
}

const Header = () => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const {user} = useAppSelector(state => state.user)
    const popoverItems = usePopoverItems(user?.role || 0)
    const [open, setOpen] = React.useState(false)
    const {isWorkStarted} = useAppSelector(state => state.workStatus)

    const handleOpenChange = (newOpen: boolean) => {
        setOpen(newOpen)
    }

    const handleChangeWorkStatus = () => {
        dispatch(toggleWorkStatus())
        if (isWorkStarted) {
            navigate(EndRoute.path)
        }
    }

    const menuContent = (
        <Menu
            items={popoverItems}
            style={{
                border: 'none',
                fontSize: '18px'
        }}
        />
    )

    return (
        <Layout.Header className={styles.header}>
            <div className={styles.centerSection}>
                <Button
                    type='primary'
                    onClick={handleChangeWorkStatus}
                    danger={isWorkStarted}
                    size='large'
                    style={{
                        fontSize: '20px'
                    }}
                >
                    {isWorkStarted ? 'Закончить работу' : 'Начать работу'}
                </Button>
            </div>
            <div>
                <Popover
                    placement='bottomRight'
                    trigger='click'
                    content={menuContent}
                    open={open}
                    onOpenChange={handleOpenChange}
                >
                    <Button
                        type='text'
                        icon={<MenuOutlined />}
                        className={styles.menuButton}
                        size='large'
                    />
                </Popover>
            </div>
        </Layout.Header>
    )
}

export {
    Header,
}