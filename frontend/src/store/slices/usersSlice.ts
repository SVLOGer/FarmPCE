import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type {UserData} from "../../shared/types";

interface UsersState {
    users: UserData[]
    isLoading: boolean
    error: string | null
}

const initialState: UsersState = {
    users: [],
    isLoading: false,
    error: null,
}

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        setUsers: (state, action: PayloadAction<UserData[]>) => {
            state.users = action.payload
        },
        addUser: (state, action: PayloadAction<UserData>) => {
            state.users.push(action.payload)
        },
        updateUser: (state, action: PayloadAction<{ id: string; data: Partial<UserData> }>) => {
            const index = state.users.findIndex(user => user.id === action.payload.id)
            if (index !== -1) {
                state.users[index] = { ...state.users[index], ...action.payload.data }
            }
        },
        deleteUser: (state, action: PayloadAction<string>) => {
            state.users = state.users.filter(user => user.id !== action.payload)
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload
        },
        setError: (state, action: PayloadAction<string | null>) => {
            state.error = action.payload
        },
        clearUsers: (state) => {
            state.users = []
        }
    },
})

export const {
    setUsers,
    addUser,
    updateUser,
    deleteUser,
    setLoading,
    setError,
    clearUsers
} = usersSlice.actions
export default usersSlice.reducer