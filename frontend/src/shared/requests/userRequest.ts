import type {UserData} from "../types";

// 1 - Админ; 2 - Кадровик; 3 - Работник; 4 - Руководитель
const user: UserData = {
    id: '4',
    name: 'Иванов Иван Иваныч',
    role: 4,
    assignedTasks: [
        {
            id: 1,
            isDone: false,
        },{
            id: 2,
            isDone: true,
        },{
            id: 5,
            isDone: false,
        }]
}

const getUser = () => {
    return user
}

export {
    getUser
}