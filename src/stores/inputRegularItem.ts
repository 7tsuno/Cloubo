import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from 'stores'

export interface InputRegularItemState {
  targetDay: string
  title: string
}

const initialState: InputRegularItemState = {
  targetDay: '',
  title: '',
}

const slice = createSlice({
  name: 'calculation',
  initialState,
  reducers: {
    setTargetDay: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        targetDay: action.payload,
      }
    },
    setTitle: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        title: action.payload,
      }
    },
    clear: () => {
      return {
        targetDay: '',
        title: '',
        memo: '',
      }
    },
  },
})

export default slice.reducer

export const selectInputRegularItem: (
  state: RootState
) => InputRegularItemState = (state: RootState) => state.inputRegularItem

export const { setTargetDay, setTitle, clear } = slice.actions
