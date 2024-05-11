export interface IUserMockReq {
        username: string
        password: string
}

export interface IMockedTasks {
        id: string
        title: string
        description: string
        createdAt: string
        status: ["NEUTRAL" | "URGENT" | "IMPORTANT"]
}

export interface ICreateTaskMockReq {
        title: string
        description: string
        status: ["NEUTRAL" | "URGENT" | "IMPORTANT"]
}

export interface IMockedParam {
        id: string
}

export interface IMockDeleteReq {
        taskId: string  
}


