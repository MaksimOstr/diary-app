import { fetchUser, login, refreshToken } from "../../slices/auth-slice";
import { IUser, IUserReq } from "../../types/types";
import { authApi } from "./auth-api";

export const authApiSlice = authApi.injectEndpoints({
    endpoints: builder => ({
        register: builder.mutation<IUser, IUserReq>({
            query: (body) => ({
                url: `auth/register`,
                method: 'POST',
                body
            })
        }),
        login: builder.mutation<string, IUserReq>({
            query: (body) => ({
                url: `/auth/login`,
                method: 'POST',
                body
            }),
            async onQueryStarted(arg, api) {
                try {
                    const { data } = await api.queryFulfilled
                    console.log(data)
                    api.dispatch(login(data))
                    localStorage.setItem('token', data)
                } catch (err) {
                    console.log(err)
                }
            }
        }),
        refreshToken: builder.query<string, void>({
            query: () => `auth/refresh`,
            async onQueryStarted(arg, api) {
                try {
                    const { data } = await api.queryFulfilled
                    api.dispatch(refreshToken(data))
                } catch (err) {
                    localStorage.removeItem('token')
                }
            }
        }),
        fetchUser: builder.query<IUser, void>({
            query: () => `auth/profile`,
            async onQueryStarted(arg, api) {
                const { data } = await api.queryFulfilled
                api.dispatch(fetchUser(data))
            }
        }),
        logout: builder.mutation<void, void>({
            query: () => ({
                url: `auth/logout`,
                method: 'GET',
            }),
        })
    })
})


export const { useLoginMutation, useRegisterMutation, useFetchUserQuery, useRefreshTokenQuery, useLogoutMutation } = authApiSlice