type RouteType = {
    path: string,
    getUrl: () => string,
}

const HomeRoute: RouteType = {
    path: '/',
    getUrl: () => HomeRoute.path,
}

const LoginRoute: RouteType = {
    path: '/login',
    getUrl: () => LoginRoute.path,
}

const TasksRoute: RouteType = {
    path: '/tasks',
    getUrl: () => TasksRoute.path,
}

const EmployersRoute: RouteType = {
    path: '/employers',
    getUrl: () => EmployersRoute.path,
}

const EndRoute: RouteType = {
    path: '/end',
    getUrl: () => EndRoute.path,
}

export {
    LoginRoute,
    HomeRoute,
    TasksRoute,
    EmployersRoute,
    EndRoute,
}