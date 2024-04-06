import { IToken, IUser, IUserReq } from "../../types/types";
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
        login: builder.mutation<IToken, IUserReq>({
            query: (body) => ({
                url: `/auth/login`,
                method: 'POST',
                body
            }),
            invalidatesTags: ['Token']
        }),
        refreshToken: builder.mutation<IToken, void>({
            query: () => `auth/refresh`,
            invalidatesTags: ['Token']
        }),
        fetchUser: builder.query<IUser, void>({
            query: () => `auth/profile`,
            providesTags: ['Token']
        }),
        logout: builder.mutation<void, void>({
            query: () => `auth/logout`,
        })
    })
})


export const { useLoginMutation, useRegisterMutation, useFetchUserQuery, useRefreshTokenMutation, useLogoutMutation } = authApiSlice