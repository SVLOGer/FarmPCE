import type {UserData} from "../types";

const API_BASE_URL = '/api';

export const authAPI = {
    login: async (credentials: { login: string; password: string }): Promise<UserData> => {
        const response = await fetch(`${API_BASE_URL}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(credentials),
        });
        if (!response.ok) throw new Error('Login failed');
        return response.json();
    },
};