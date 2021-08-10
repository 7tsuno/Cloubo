import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Category, initialCategory } from 'constants/category'
import { RootState } from 'stores'

export interface FormState {
  category: Category
  memo: string
  price: string
}

const initialState: FormState = {
  category: initialCategory,
  memo: '',
  price: '',
}

const slice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    setCategory: (state, action: PayloadAction<Category>) => {
      return {
        ...state,
        category: action.payload,
      }
    },
    setPrice: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        price: action.payload,
      }
    },
    setMemo: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        memo: action.payload,
      }
    },
    clear: () => {
      return {
        category: initialCategory,
        memo: '',
        price: '',
      }
    },
  },
})

export default slice.reducer

export const selectForm: (state: RootState) => FormState = (state: RootState) =>
  state.form

export const { setCategory, setPrice, setMemo, clear } = slice.actions
