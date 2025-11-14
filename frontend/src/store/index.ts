import { configureStore } from '@reduxjs/toolkit'
import workStatusReducer from './slices/workStatusSlice'
import userReducer from './slices/userSlice'
import usersReducer from './slices/usersSlice'
import tasksReducer from './slices/tasksSlice'

export const store = configureStore({
    reducer: {
        workStatus: workStatusReducer,
        user: userReducer,
        users: usersReducer,
        tasks: tasksReducer,
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch