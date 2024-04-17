import { createSlice } from "@reduxjs/toolkit";
import { IAuthInitial } from "../types/types";
import { authApiSlice } from "../api/auth-api/auth-api-slice";

const AuthSlice = createSlice({
    name: 'authSlice',
    initialState: {
        isAuth: false,
        user: null,
    } as IAuthInitial,
    reducers: {
        refreshToken(state, action) {
            localStorage.setItem('token', action.payload)
        },
        logout(state) {
            state.isAuth = false
            state.user = null
            localStorage.removeItem('token')
        }
    },
    extraReducers: (builder) => {
        builder.addMatcher(
            authApiSlice.endpoints.login.matchFulfilled,
            (state, { payload }) => {
                state.isAuth = true
                localStorage.setItem('token', payload.access_token)
            }
        )
        builder.addMatcher(
            authApiSlice.endpoints.fetchUser.matchFulfilled,
            (state, { payload }) => {
                state.user = payload
                state.isAuth = true
            }
        )
        builder.addMatcher(
            authApiSlice.endpoints.logout.matchFulfilled,
            (state, { payload }) => {
                state.isAuth = false
                state.user = null
                localStorage.removeItem('token')
            }
        )
        builder.addMatcher(
            authApiSlice.endpoints.changeUsername.matchFulfilled,
            (state, { payload }) => {
                localStorage.setItem('token', payload.access_token)
            }
        )
        builder.addMatcher(
            authApiSlice.endpoints.changePassword.matchFulfilled,
            (state, { payload }) => {
                state.isAuth = false
                state.user = null
                localStorage.removeItem('token')
            }
        )
    }
})

export const { logout, refreshToken } = AuthSlice.actions
export default AuthSlice.reducer