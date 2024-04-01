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
    token: string | null,
    isAuth: boolean
}



