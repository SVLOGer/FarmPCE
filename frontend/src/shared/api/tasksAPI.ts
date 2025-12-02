import type {TaskData} from "../types";

const API_BASE_URL = '/api';

export const tasksAPI = {
    getAllTasks: async (): Promise<TaskData[]> => {
        const response = await fetch(`${API_BASE_URL}/tasks`);
        if (!response.ok) throw new Error('Failed to fetch tasks');
        return response.json();
    },

    createTask: async (taskData: Omit<TaskData, 'id'>): Promise<TaskData> => {
        const response = await fetch(`${API_BASE_URL}/tasks`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(taskData),
        });
        if (!response.ok) throw new Error('Failed to create task');
        return response.json();
    },

    updateTask: async (id: number, taskData: Partial<TaskData>): Promise<TaskData> => {
        const response = await fetch(`${API_BASE_URL}/tasks`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id, ...taskData }),
        });
        if (!response.ok) throw new Error('Failed to update task');
        return response.json();
    },
};
