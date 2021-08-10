import { createSlice } from '@reduxjs/toolkit'
import { RootState } from 'stores'
import { deleteRecordsAsync, postRecordsAsync } from './records'

export interface CommonModalState {
  title: string
  open: boolean
}

const initialState: CommonModalState = {
  title: '',
  open: false,
}

export const slice = createSlice({
  name: 'commonModal',
  initialState,
  reducers: {
    closeModal: () => {
      return {
        open: false,
        title: '',
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(postRecordsAsync.fulfilled, (state) => {
        state.open = true
        state.title = '登録が完了しました'
      })
      .addCase(deleteRecordsAsync.fulfilled, (state) => {
        state.open = true
        state.title = '削除が完了しました'
      })
  },
})

export default slice.reducer

export const selectCommonModal: (state: RootState) => CommonModalState = (
  state: RootState
) => state.commonModal

export const { closeModal } = slice.actions
