import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type {UserData} from "../../shared/types";

interface UserState {
    user: UserData | null
    isLoggedIn: boolean
}

const initialState: UserState = {
    user: null,
    isLoggedIn: false,
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login: (state, action: PayloadAction<UserData>) => {
            state.user = action.payload
            state.isLoggedIn = true
        },
        logout: (state) => {
            state.user = null
            state.isLoggedIn = false
        },
        updateUser: (state, action: PayloadAction<Partial<UserData>>) => {
            if (state.user) {
                state.user = { ...state.user, ...action.payload }
            }
        },
        setUser: (state, action: PayloadAction<UserData | null>) => {
            state.user = action.payload
            state.isLoggedIn = !!action.payload
        },
        updateTaskStatus: (state, action: PayloadAction<{ taskId: number; isDone: boolean }>) => {
            if (state.user) {
                const { taskId, isDone } = action.payload;
                const taskIndex = state.user.assignedTasks.findIndex(task => task.id === taskId);

                if (taskIndex !== -1) {
                    state.user.assignedTasks[taskIndex].isDone = isDone;
                }
            }
        },
    },
})

export const {
    login,
    logout,
    updateUser,
    setUser,
    updateTaskStatus,
    toggleTaskStatus,
    addTaskToUser,
    removeTaskFromUser
} = userSlice.actions
export default userSlice.reducer