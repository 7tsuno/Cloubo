import { createSlice } from '@reduxjs/toolkit'
import { RootState } from 'stores'
import { deleteRecordsAsync, postRecordsAsync } from './records'

export interface ProgressState {
  progress: boolean
}

const initialState: ProgressState = {
  progress: false,
}

export const slice = createSlice({
  name: 'progress',
  initialState,
  reducers: {
    startProgress: () => {
      return {
        progress: true,
      }
    },
    endProgress: () => {
      return {
        progress: false,
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(postRecordsAsync.pending, (state) => {
        state.progress = true
      })
      .addCase(postRecordsAsync.fulfilled, (state) => {
        state.progress = false
      })
      .addCase(deleteRecordsAsync.pending, (state) => {
        state.progress = true
      })
      .addCase(deleteRecordsAsync.fulfilled, (state) => {
        state.progress = false
      })
  },
})

export default slice.reducer

export const selectProgress: (state: RootState) => ProgressState = (
  state: RootState
) => state.progress

export const { startProgress, endProgress } = slice.actions
