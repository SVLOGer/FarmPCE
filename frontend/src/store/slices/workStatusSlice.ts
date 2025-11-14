import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

interface WorkStatusState {
    isWorkStarted: boolean
    startTime: string | null
    endTime: string | null
}

const initialState: WorkStatusState = {
    isWorkStarted: false,
    startTime: null,
    endTime: null,
}

const workStatusSlice = createSlice({
    name: 'workStatus',
    initialState,
    reducers: {
        startWork: (state) => {
            state.isWorkStarted = true
            state.startTime = new Date().toISOString()
            state.endTime = null
        },
        endWork: (state) => {
            state.isWorkStarted = false
            state.endTime = new Date().toISOString()
        },
        toggleWorkStatus: (state) => {
            if (state.isWorkStarted) {
                state.isWorkStarted = false
                state.endTime = new Date().toISOString()
            } else {
                state.isWorkStarted = true
                state.startTime = new Date().toISOString()
                state.endTime = null
            }
        },
        setWorkStatus: (state, action: PayloadAction<boolean>) => {
            state.isWorkStarted = action.payload
        },
    },
})

export const { startWork, endWork, toggleWorkStatus, setWorkStatus } = workStatusSlice.actions
export default workStatusSlice.reducer