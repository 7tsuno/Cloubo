import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import dayjs from 'dayjs'
import { RootState } from 'stores'

export interface DateState {
  year: number
  month: number
  day: number
}

const initialState: DateState = {
  year: dayjs().year(),
  month: dayjs().month() + 1,
  day: dayjs().date(),
}

const slice = createSlice({
  name: 'date',
  initialState,
  reducers: {
    setDate: (state, action: PayloadAction<DateState>) => {
      return {
        year: action.payload.year,
        month: action.payload.month,
        day: action.payload.day,
      }
    },
    resetDate: () => {
      return {
        year: dayjs().year(),
        month: dayjs().month() + 1,
        day: dayjs().date(),
      }
    },
  },
})

export default slice.reducer

export const selectDate: (state: RootState) => DateState = (state: RootState) =>
  state.date

export const { setDate, resetDate } = slice.actions
