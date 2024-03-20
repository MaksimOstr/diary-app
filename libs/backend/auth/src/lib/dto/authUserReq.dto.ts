import { IsNotEmpty, IsString, MinLength } from 'class-validator'

export {} from 'class-validator'


export class AuthUserReqDto {
    constructor() {
        this.username = ''
        this.password = ''
    }

    @IsString()
    @MinLength(3)
    username: string

    @IsString()
    @MinLength(4)
    password: string
}