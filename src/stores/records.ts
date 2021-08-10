import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { API } from 'constants/api'
import { Category } from 'constants/category'
import { RootState } from 'stores'
import { auth0Axios } from 'utils/axios'
import { FormState } from './form'

export interface Record {
  category: Category
  day: number
  memo: string
  mine: boolean
  month: number
  number: number
  price: string
  user: string
  year: number
}

export interface RecordState {
  records: Array<Record>
}

export interface TargetDate {
  year?: number
  month?: number
  day?: number
}

const initialState: RecordState = {
  records: [],
}

const getRecords = auth0Axios<TargetDate, Array<Record>>(API.GET_RECORDS)
const postRecord = auth0Axios<FormState, never>(API.POST_RECORD)
const deleteRecord = auth0Axios<number, never>(API.DELETE_RECORD)

export const getRecordsAsync = createAsyncThunk<
  Array<Record>,
  {
    payload: TargetDate
    token: string
  }
>('records/get', async ({ payload, token }) => {
  return await getRecords(payload, token)
})

export const postRecordsAsync = createAsyncThunk<
  void,
  {
    payload: FormState
    token: string
  }
>('records/post', async ({ payload, token }) => {
  await postRecord(payload, token)
})

export const deleteRecordsAsync = createAsyncThunk<
  void,
  {
    payload: number
    token: string
  }
>('records/delete', async ({ payload, token }) => {
  await deleteRecord(payload, token)
})

const slice = createSlice({
  name: 'records',
  initialState,
  reducers: {
    setRecords: (state, action: PayloadAction<Array<Record>>) => {
      return {
        ...state,
        records: action.payload,
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getRecordsAsync.fulfilled, (state, action) => {
      state.records = action.payload
    })
  },
})

export default slice.reducer

export const selectRecords: (state: RootState) => RecordState = (
  state: RootState
) => state.records

export const { setRecords } = slice.actions
