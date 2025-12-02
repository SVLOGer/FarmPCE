const API_BASE_URL = '/api';

export const assignedTasksAPI = {
    assignTask: async (userId: string, taskId: number): Promise<void> => {
        const response = await fetch(`${API_BASE_URL}/task/assign`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ user_id: userId, task_id: taskId }),
        });
        if (!response.ok) throw new Error('Failed to assign task');
    },

    unassignTask: async (userId: string, taskId: number): Promise<void> => {
        const response = await fetch(`${API_BASE_URL}/task/assign`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ user_id: userId, task_id: taskId }),
        });
        if (!response.ok) throw new Error('Failed to unassign task');
    },

    updateTaskStatus: async (userId: string, taskId: number, isDone: boolean): Promise<void> => {
        const response = await fetch(`${API_BASE_URL}/task/status`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ user_id: userId, task_id: taskId, is_done: isDone }),
        });
        if (!response.ok) throw new Error('Failed to update task status');
    },
};