type AssignedTaskData = {
    id: number,
    isDone: boolean,
}

type UserData = {
    id: string,
    name: string,
    role: number,
    login: string,
    password: string,
    assignedTasks: AssignedTaskData[],
}

type TaskData = {
    id: number,
    title: string,
    cost: number,
    description: string,
    deadline: string,
    requirements: string,
}

type UserTaskData = {
    id: string,
    title: string,
    isDone: boolean,
}

export type {
    UserData,
    TaskData,
    UserTaskData,
    AssignedTaskData,
}