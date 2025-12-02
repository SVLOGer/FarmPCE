import {type JSX} from 'react';
import {Routes, Route} from 'react-router-dom';
import {LoginRoute, HomeRoute, TasksRoute, EmployersRoute, EndRoute} from '../shared/routes'
import {EmployersPage, EndPage, HomePage, LoginPage, NotFoundPage, TasksPage} from '../pages'
import {useAppSelector} from "../shared/hooks";

function App() {
    const {user} = useAppSelector(state => state.user)

    const commonRoutes = [
        { path: HomeRoute.path, element: <HomePage /> },
        { path: LoginRoute.path, element: <LoginPage /> },
    ];

    // 1 - Админ; 2 - Кадровик; 3 - Работник; 4 - Руководитель
    const roleBasedRoutes: { [key: number]: Array<{ path: string; element: JSX.Element }> } = {
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