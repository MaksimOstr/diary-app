import { HttpResponse, PathParams, http } from 'msw'
import { ICreateTaskMockReq, IMockDeleteReq, IMockedParam, IMockedTasks, IUserMockReq } from './types'



const tasks = [] as IMockedTasks[]


export const handlers = [

    http.post<never, IUserMockReq, never>('http://localhost:3000/api/auth/login', async ({ request }) => {
        const data = await request.json()
        if (data.username === 'test' && data.password === '1212') {
            return HttpResponse.json({
                access_token: 'kdfajdkajrelwnrlwnr'
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
    }),

    http.get<never, ICreateTaskMockReq, IMockedTasks[]>('http://localhost:3000/api/task', () => {
        return HttpResponse.json(tasks)
    }),

    http.post<never, ICreateTaskMockReq, never>('http://localhost:3000/api/task/create', async ({ request }) => {
        const data = await request.json()
        const taskBody = {
            id: new Date().toString(),
            createdAt: new Date().toString(),
            description: data.description,
            status: data.status,
            title: data.title
        } as IMockedTasks

        tasks.push(taskBody)
        return HttpResponse.json({}, { status: 200 })
    }),

    http.get<IMockedParam, never, never>('http://localhost:3000/api/task/:id', async ({ params }) => {
        const task = tasks.find(task => task.id === params.id)
        return HttpResponse.json(task, {status: 200})
    }),

    http.put<IMockedParam, ICreateTaskMockReq, never>('http://localhost:3000/api/task/:id/change', async ({ request, params }) => {


        const objIndex = tasks.findIndex(obj => obj.id == params.id);

    
        const data = await request.json()

        tasks[objIndex].description = data.description
        tasks[objIndex].title = data.title
        tasks[objIndex].status = data.status
        
        return HttpResponse.json({}, {status: 200})
    }),

    http.delete<never, IMockDeleteReq, never>('http://localhost:3000/api/task', async ({ request }) => {
        const data = await request.json()
        const index = tasks.findIndex(n => n.id === data.taskId);
        tasks.splice(index, 1)

        console.log(tasks)
        return HttpResponse.json({}, { status: 200 })
    }),

    http.get('http://localhost:3000/api/auth/profile', () => {
        return HttpResponse.json({
            id: '1',
            username: 'test',
            roles: ['USER']
        })
    })
]