import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from 'stores'
import { InputRegularItemState } from './inputRegularItem'

export interface RegularItem {
  index: number
  confirmedMonths: Array<{
    year: number
    month: number
  }>
  targetDay: string
  title: string
}

export interface RegularItemsState {
  regularItems: Array<RegularItem>
}

const initialState: RegularItemsState = {
  regularItems: [],
}

const slice = createSlice({
  name: 'calculation',
  initialState,
  reducers: {
    addRegularItem: (state, action: PayloadAction<InputRegularItemState>) => {
      const nextIndex = state.regularItems.length
      state.regularItems.push({
        index: nextIndex,
        confirmedMonths: [],
        targetDay: action.payload.targetDay,
        title: action.payload.title,
      })
    },
    changeNotificated: (
      state,
      action: PayloadAction<{
        index: number
        notificatedDate: {
          year: number
          month: number
        }
      }>
    ) => {
      if (
        state.regularItems[action.payload.index].confirmedMonths.some(
          (confirmedMonth) =>
            confirmedMonth.year === action.payload.notificatedDate.year &&
            confirmedMonth.month === action.payload.notificatedDate.month
        )
      ) {
        state.regularItems[action.payload.index].confirmedMonths =
          state.regularItems[action.payload.index].confirmedMonths.filter(
            (confirmedMonth) =>
              !(
                confirmedMonth.year === action.payload.notificatedDate.year &&
                confirmedMonth.month === action.payload.notificatedDate.month
              )
          )
      } else {
        state.regularItems[action.payload.index].confirmedMonths.push(
          action.payload.notificatedDate
        )
      }
    },
    deleteRegularItem: (state, action: PayloadAction<number>) => {
      state.regularItems.splice(action.payload, 1)
    },
  },
})

export default slice.reducer

export const selectRegularItems: (state: RootState) => RegularItemsState = (
  state: RootState
) => state.regularItems

export const { addRegularItem, deleteRegularItem, changeNotificated } =
  slice.actions
