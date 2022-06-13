import { Action, AsyncThunkAction, configureStore, Middleware, Reducer } from '@reduxjs/toolkit'

import auth from './reducers/authReducer';

const store = configureStore({
  reducer: {
    auth: auth.reducer,
  }
})

export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch


