import React, {useEffect} from 'react';
import {Routes, Route} from 'react-router-dom';
import {LoginRoute, HomeRoute, TasksRoute, EmployersRoute, EndRoute} from '../shared/routes'
import {EmployersPage, EndPage, HomePage, LoginPage, NotFoundPage, TasksPage} from '../pages'
import {getTasks, getUser, getUsers} from "../shared/requests";
import {useAppDispatch, useAppSelector} from "../shared/hooks";
import {setUser} from "../store/slices/userSlice.ts";
import {setUsers} from "../store/slices/usersSlice.ts";
import {setTasks} from "../store/slices/tasksSlice.ts";

function App() {
    const dispatch = useAppDispatch()
    const {user} = useAppSelector(state => state.user)

    useEffect(() => {
        const loadData = async () => {
            try {
                const userData = await getUser()
                const tasksData = await getTasks()
                const usersData = await getUsers()

                dispatch(setUser(userData));
                dispatch(setTasks(tasksData));
                dispatch(setUsers(usersData));
            } catch (error) {
                console.error('Error loading data:', error);
            }
        };

        loadData();
    }, [dispatch]);

    const commonRoutes = [
        { path: HomeRoute.path, element: <HomePage /> },
        { path: LoginRoute.path, element: <LoginPage /> },
    ];

    // 1 - Админ; 2 - Кадровик; 3 - Работник; 4 - Руководитель
    const roleBasedRoutes = {
        1: [
            { path: EmployersRoute.path, element: <EmployersPage /> },
        ],
        2: [
            { path: EmployersRoute.path, element: <EmployersPage /> },
            { path: TasksRoute.path, element: <TasksPage /> },
            { path: EndRoute.path, element: <EndPage /> },
        ],
        3: [
            { path: TasksRoute.path, element: <TasksPage /> },
            { path: EndRoute.path, element: <EndPage /> },
        ],
        4: [
            { path: EmployersRoute.path, element: <EmployersPage /> },
        ],
    };

    const currentRoleRoutes = user?.role ? roleBasedRoutes[user.role] || [] : [];

    if (!user) {
        return <div>Загрузка...</div>;
    }

    return (
        <Routes>
            {[...commonRoutes, ...currentRoleRoutes].map((route, index) => (
                <Route key={index} path={route.path} element={route.element} />
            ))}
            <Route path="*" element={<NotFoundPage/>}/>
        </Routes>
    )
}

export default App;