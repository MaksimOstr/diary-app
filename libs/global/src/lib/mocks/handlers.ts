import { HttpResponse, http } from 'msw'
import { ISignInMockRequest } from './types'




export const handlers = [
    http.post<never, ISignInMockRequest, never>('http://localhost:3000/api/auth/login',async ({request}) => {
        const data = await request.json()
        if(data.username === 'test' && data.password === '1212') {
            return HttpResponse.json({
                username: data.username
            })
        }
        
        return HttpResponse.json({
            message: 'Username or password is incorrect'
        },  { status: 401 })
    })
]