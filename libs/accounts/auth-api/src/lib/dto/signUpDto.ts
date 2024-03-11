import { IsNotEmpty, Min, MinLength, isNotEmpty, isString } from 'class-validator'

export class SignUpDto {
    
    constructor() {
        this.username = ''
        this.password = ''
    }

    @IsNotEmpty()
    @MinLength(3)
    username: string
    
    @MinLength(4)
    password: string
}