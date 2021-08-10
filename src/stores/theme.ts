import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from 'stores'
import {
  Color,
  initialColor,
  initialMode,
  initialShade,
  MODE,
  Mode,
  Shade,
} from 'constants/theme'

export interface CalculationState {
  mode: Mode
  color: Color
  shade: Shade
}

const initialState: CalculationState = {
  mode: initialMode,
  color: initialColor,
  shade: initialShade,
}

const slice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    changeMode: (state) => {
      return {
        ...state,
        mode: state.mode === MODE[0] ? MODE[1] : MODE[0],
      }
    },
    setColor: (state, action: PayloadAction<Color>) => {
      return {
        ...state,
        color: action.payload,
      }
    },
    setShade: (state, action: PayloadAction<Shade>) => {
      return {
        ...state,
        shade: action.payload,
      }
    },
  },
})

export const selectTheme: (state: RootState) => CalculationState = (
  state: RootState
) => state.theme

export default slice.reducer

export const { changeMode, setColor, setShade } = slice.actions
