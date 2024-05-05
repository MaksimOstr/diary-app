import { HttpResponse, http } from 'msw'
import { IUserMockReq } from './types'




export const handlers = [
    http.post<never, IUserMockReq, never>('http://localhost:3000/api/auth/login', async ({ request }) => {
        const data = await request.json()
        if (data.username === 'test' && data.password === '1212') {
            return HttpResponse.json({
                username: data.username
            })
        }

        return HttpResponse.json({
            message: 'Username or password is incorrect'
        }, { status: 401 })
    }),

    http.post<never, IUserMockReq, never>('http://localhost:3000/api/auth/register', async ({ request }) => {
        const data = await request.json()

        if (data.username === 'test') {
            return HttpResponse.json({
                message: 'User already exists!'
            }, { status: 401 })
        }

        return HttpResponse.json({
            username: data.username
        }, { status: 201 })
    })
]