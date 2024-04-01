import { createSlice } from "@reduxjs/toolkit";
import { IAuthInitial } from "../types/types";

const AuthSlice = createSlice({
    name: 'authSlice',
    initialState: {
        isAuth: false,
        user: null,
        token: null
    } as IAuthInitial,
    reducers: {
        login(state, action) {
            state.token = action.payload
            state.isAuth = true
            localStorage.setItem('token', action.payload)
        },
        refreshToken(state, action) {
            state.isAuth = true
            state.token = action.payload
            localStorage.setItem('token', action.payload)
        },
        fetchUser(state, action) {
            state.user = action.payload
        },
        logout(state) {
            state.isAuth = false
            state.token = null
            state.user = null
        }
    }
})

export const { login, fetchUser, refreshToken, logout } = AuthSlice.actions
export default AuthSlice.reducer