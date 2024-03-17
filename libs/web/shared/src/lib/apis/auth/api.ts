import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/api/' }),
    tagTypes:['Users'],
    endpoints: (builder) => ({
       getUsers: builder.query({
            query: () => `users`,
            providesTags: (result) => 
                result ? 
                    [
                        ...result.map((id: number) => ({ type: 'Users', id } as const)),
                            { type: 'Users', id: 'LIST' }
                    ]
                        :
                    [{type: 'Users', id: 'LIST'}]
       }),
       signUp: builder.mutation({
            query: (body) => ({
                url: `users`,
                method: 'POST',
                body: body
            }),
            invalidatesTags: [{ type: 'Users', id: 'LIST' }],
       })
    })
})

export const { useGetUsersQuery, useSignUpMutation } = authApi