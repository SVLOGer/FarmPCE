import type {UserData} from "../types";

const users: UserData[] = [
    {
        id: '1',
        name: 'Иванов Иван Иваныч',
        role: 2,
        assignedTasks: [
            {
                id: 1,
                isDone: false,
            },{
                id: 2,
                isDone: false,
            },{
                id: 5,
                isDone: false,
            },
        ]
    },{
        id: '2',
        name: 'Иванов Иван Иваныч',
        role: 2,
        assignedTasks: [
            {
                id: 1,
                isDone: false,
            },{
                id: 2,
                isDone: false,
            },{
                id: 5,
                isDone: false,
            },
        ]
    },{
        id: '3',
        name: 'Иванов Иван Иваныч',
        role: 2,
        assignedTasks: [
            {
                id: 1,
                isDone: false,
            },{
                id: 2,
                isDone: false,
            },{
                id: 5,
                isDone: false,
            },
        ]
    },{
        id: '4',
        name: 'Иванов Иван Иваныч',
        role: 2,
        assignedTasks: [
            {
                id: 1,
                isDone: false,
            },{
                id: 2,
                isDone: false,
            },{
                id: 5,
                isDone: false,
            },
        ]
    },{
        id: '5',
        name: 'Иванов Иван Иваныч',
        role: 2,
        assignedTasks: [
            {
                id: 1,
                isDone: false,
            },{
                id: 2,
                isDone: false,
            },{
                id: 5,
                isDone: false,
            },
        ]
    },
]

const getUsers = () => {
    return users
}

export {
    getUsers
}