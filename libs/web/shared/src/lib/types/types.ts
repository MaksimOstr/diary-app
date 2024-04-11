export interface IUserReq {
    username: string
    password: string
}

export interface IUser {
    id: string
    username: string
    roles: Array<string>
}

export interface IAuthInitial {
    user: IUser | null,
    isAuth: boolean,
    token: string | null
}

export interface IToken {
    access_token: string
}

export interface ITask {
    id: string,
    title: string,
    description: string
}

export interface ICreateTaskReq {
    title: string
    description: string
}

export interface IChangeTaskReq {
    taskId: string
    taskData: ICreateTaskReq
}


