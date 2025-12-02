import type {UserData} from "../types";

const API_BASE_URL = '/api';

export const usersAPI = {
    getAllUsers: async (): Promise<UserData[]> => {
        const response = await fetch(`${API_BASE_URL}/user`);
        if (!response.ok) throw new Error('Failed to fetch users');
        return response.json();
    },

    createUser: async (userData: Omit<UserData, 'id' | 'assignedTasks'> & { password?: string }): Promise<UserData> => {
        const response = await fetch(`${API_BASE_URL}/user`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });
        if (!response.ok) throw new Error('Failed to create user');
        return response.json();
    },

    updateUser: async (id: string, userData: Partial<UserData>): Promise<UserData> => {
        const response = await fetch(`${API_BASE_URL}/user`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id, ...userData }),
        });
        if (!response.ok) throw new Error('Failed to update user');
        return response.json();
    },

    deleteUser: async (id: string): Promise<void> => {
        const response = await fetch(`${API_BASE_URL}/user?id=${id}`, {
            method: 'DELETE',
        });
        if (!response.ok) throw new Error('Failed to delete user');
    },
};