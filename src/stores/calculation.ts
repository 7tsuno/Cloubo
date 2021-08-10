import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from 'stores'

export interface CalculationState {
  payPrice: string
}

const initialState: CalculationState = {
  payPrice: '',
}

const slice = createSlice({
  name: 'calculation',
  initialState,
  reducers: {
    setPayPrice: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        payPrice: action.payload,
      }
    },
  },
})

export default slice.reducer

export const selectCalculation: (state: RootState) => CalculationState = (
  state: RootState
) => state.calculation

export const { setPayPrice } = slice.actions
