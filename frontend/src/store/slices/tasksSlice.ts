import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

type TaskData = {
    id: number
    title: string
    cost: number
    description: string
    deadline: string
    requirements: string
}

interface TasksState {
    tasks: TaskData[]
    isLoading: boolean
    error: string | null
    selectedTask: TaskData | null
}

const initialState: TasksState = {
    tasks: [],
    isLoading: false,
    error: null,
    selectedTask: null
}

const tasksSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        setTasks: (state, action: PayloadAction<TaskData[]>) => {
            state.tasks = action.payload
        },
        addTask: (state, action: PayloadAction<TaskData>) => {
            state.tasks.push(action.payload)
        },
        updateTask: (state, action: PayloadAction<{ id: number; data: Partial<TaskData> }>) => {
            const index = state.tasks.findIndex(task => task.id === action.payload.id)
            if (index !== -1) {
                state.tasks[index] = { ...state.tasks[index], ...action.payload.data }
            }
        },
        deleteTask: (state, action: PayloadAction<number>) => {
            state.tasks.splice(action.payload, 1)
        },
        setTaskCost: (state, action: PayloadAction<{ index: number; cost: number }>) => {
            const { index, cost } = action.payload
            if (state.tasks[index]) {
                state.tasks[index].cost = cost
            }
        },
        setTaskDeadline: (state, action: PayloadAction<{ index: number; deadline: string }>) => {
            const { index, deadline } = action.payload
            if (state.tasks[index]) {
                state.tasks[index].deadline = deadline
            }
        },
        setSelectedTask: (state, action: PayloadAction<TaskData | null>) => {
            state.selectedTask = action.payload
        },
        setSelectedTaskIndex: (state, action: PayloadAction<number | null>) => {
            if (action.payload !== null && state.tasks[action.payload]) {
                state.selectedTask = state.tasks[action.payload]
            } else {
                state.selectedTask = null
            }
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload
        },
        setError: (state, action: PayloadAction<string | null>) => {
            state.error = action.payload
        },
        clearTasks: (state) => {
            state.tasks = []
            state.selectedTask = null
        },
        clearSelectedTask: (state) => {
            state.selectedTask = null
        }
    },
})

export const {
    setTasks,
    addTask,
    updateTask,
    deleteTask,
    setTaskCost,
    setTaskDeadline,
    setSelectedTask,
    setSelectedTaskIndex,
    setLoading,
    setError,
    clearTasks,
    clearSelectedTask
} = tasksSlice.actions
export default tasksSlice.reducer