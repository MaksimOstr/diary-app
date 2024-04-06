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
    isAuth: boolean
}

export interface IToken {
    access_token: string
}



