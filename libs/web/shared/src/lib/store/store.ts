import { configureStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import authSlice from '../slices/auth-slice'
import { authApi } from '../api/auth-api/auth-api'
import toggleSlice from '../slices/toggle-slice'


export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    auth: authSlice,
    toggler: toggleSlice
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(authApi.middleware)

})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch 
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
