import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  FetchBaseQueryMeta,
} from '@reduxjs/toolkit/query'
import { RootState } from '../../store/store'
import { logout, refreshToken } from '../../slices/auth-slice'
import { IToken } from '../../types/types'
import { QueryReturnValue } from '@reduxjs/toolkit/dist/query/baseQueryTypes'


const baseQuery = fetchBaseQuery({
  baseUrl: 'http://localhost:3000/api',
  credentials: 'include',
  prepareHeaders: (headers, api) => {
    const token = localStorage.getItem('token')
    if (token) {
      headers.set('authorization', `Bearer ${token}`)
    }

    return headers
  }
})


const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions)
  if (result.error && result.error.status === 401) {
    const refreshResult = await baseQuery('auth/refresh', api, extraOptions) as QueryReturnValue<IToken, FetchBaseQueryError, FetchBaseQueryMeta>
    if (refreshResult.data) {
      api.dispatch(refreshToken(refreshResult.data.access_token))
      result = await baseQuery(args, api, extraOptions)
    } else {
      await baseQuery('auth/logout', api, extraOptions)
      api.dispatch(logout())
    }
  }
  return result
}


export const authApi = createApi({
  baseQuery: baseQueryWithReauth,
  endpoints: builder => ({}),
  tagTypes: ['Token']
})

