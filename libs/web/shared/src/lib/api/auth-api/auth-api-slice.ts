import { IChangeTaskReq, ICreateTaskReq, ITask, IToken, IUser, IUserReq } from "../../types/types";
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
                url: `auth/login`,
                method: 'POST',
                body
            }),
            invalidatesTags: ['Token', 'Tasks']
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
            query: () =>  `auth/logout`
        }),
        getTasks: builder.query<ITask[], void>({
            query: () => `task`,
            providesTags: (result, error, arg) =>
                result
                  ? [...result.map(({ id }) => ({ type: 'Tasks' as const, id })), 'Tasks']
                  : ['Tasks'],
        }),
        createTask: builder.mutation<ITask, ICreateTaskReq>({
            query: (body) => ({
                url: `task/create`,
                method: 'POST',
                body: body
            }),
            invalidatesTags: ['Tasks']
        }),
        deleteTask: builder.mutation<any, {taskId: string}>({
            query: (body) => ({
                url: `task`,
                method: 'DELETE',
                body
            }),
            invalidatesTags: (result, error, arg) => [{ type: 'Tasks', id: arg.taskId }],
        }),
        getTaskById: builder.query<ITask, string | undefined>({
            query: (taskId) => ({
                url: `task/${taskId}`,
                method: 'GET',
            }),
            providesTags:(result, error, arg) => [{type: 'Tasks', id: arg}]
        }),
        changeTask: builder.mutation<ITask, IChangeTaskReq>({
            query: (data) => ({
                url: `task/${data.taskId}/change`,
                method: 'PUT',
                body: data.taskData
            }),
            invalidatesTags: (result, error, arg) => [{ type: 'Tasks', id: arg.taskId}],
        }),
        changeUsername: builder.mutation<IToken, { username: string }>({
            query: (data) => ({
                url: `auth/changeUsername`,
                method: 'PUT',
                body: data
            }),
            invalidatesTags: ['Token']
        }),
        confirmPassword: builder.query<void, { password: string }>({
            query: (data) => ({
                url: `auth/confirmPassword`,
                method: 'POST',
                body: data
            })
        }),
        changePassword: builder.mutation<void, { password: string }>({
            query: (data) => ({
                url: `auth/changePassword`,
                method: 'PUT',
                body: data
            })
        })
    })
})


export const { useLoginMutation, useRegisterMutation, useFetchUserQuery, useRefreshTokenMutation, useLogoutMutation, useGetTasksQuery, useCreateTaskMutation, useDeleteTaskMutation, useGetTaskByIdQuery, useChangeTaskMutation, useChangeUsernameMutation, useLazyConfirmPasswordQuery, useChangePasswordMutation } = authApiSlice