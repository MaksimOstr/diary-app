import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { IUser, IUserReq } from '../../types/types'

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/api/' }),
    tagTypes:['Users'],
    endpoints: (builder) => ({
       getUsers: builder.query<IUser[], void>({
            query: () => `users`,
            providesTags: (result) => 
                result ? 
                    [
                        ...result.map(({id}) => ({ type: 'Users', id } as const)),
                            { type: 'Users', id: 'LIST' }
                    ]
                        :
                    [{type: 'Users', id: 'LIST'}]
       }),
       getProfile: builder.query<any, void>({
            query: () => `auth/profile`,
            providesTags: (result) => 
                result ? 
                    [
                        ...result.map(({id}) => ({ type: 'Users', id } as const)),
                            { type: 'Users', id: 'LIST' }
                    ]
                        :
                    [{type: 'Users', id: 'LIST'}]
       }),
       signUp: builder.mutation<IUser, IUserReq>({
            query: (body) => ({
                url: `users`,
                method: 'POST',
                body: body
            }),
            invalidatesTags: [{ type: 'Users', id: 'LIST' }],
       }),
       signIn: builder.mutation({
            query: (body) => ({
                url: `auth/login`,
                method: 'POST',
                body: body
            }),
        invalidatesTags: [{ type: 'Users', id: 'LIST' }],
       }),
    })
})

export const { useGetUsersQuery, useSignUpMutation, useSignInMutation, useGetProfileQuery } = authApi