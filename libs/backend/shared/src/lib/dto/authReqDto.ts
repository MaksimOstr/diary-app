import { IsString, MinLength } from 'class-validator'

export {} from 'class-validator'


export class AuthReqDto {
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