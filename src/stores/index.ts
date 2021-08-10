import { combineReducers } from 'redux'
import { configureStore } from '@reduxjs/toolkit'
import recordsReducer from 'stores/records'
import formReducer from 'stores/form'
import calculationReducer from 'stores/calculation'
import themeReducer from 'stores/theme'
import commonModalReducer from 'stores/commonModal'
import progressReducer from 'stores/progress'
import dateReducer from 'stores/date'
import { save, load } from 'redux-localstorage-simple'

const reducer = combineReducers({
  records: recordsReducer,
  form: formReducer,
  calculation: calculationReducer,
  theme: themeReducer,
  commonModal: commonModalReducer,
  progress: progressReducer,
  date: dateReducer,
})

const store = configureStore({
  reducer,
  preloadedState: load(),
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(save()),
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>

export default store
