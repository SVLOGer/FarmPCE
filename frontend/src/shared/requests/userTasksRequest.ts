import type {UserTaskData} from "../types";

const tasks: UserTaskData[] = [
    {
        id: '1',
        title: 'Сбалансированный рацион',
        isDone: false,
    },{
        id: '2',
        title: 'Сбалансированный рацион',
        isDone: false,
    },{
        id: '3',
        title: 'Сбалансированный рацион',
        isDone: false,
    },{
        id: '4',
        title: 'Сбалансированный рацион',
        isDone: false,
    },{
        id: '5',
        title: 'Сбалансированный рацион',
        isDone: false,
    }
]

const getUserTasks = () => {
    return tasks
}

export {
    getUserTasks
}