import { IsString, MinLength } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger';



export class AuthReqDto {
    constructor() {
        this.username = ''
        this.password = ''
    }

    @ApiProperty({minLength: 3})
    @IsString()
    @MinLength(3)
    username: string

    @ApiProperty({minLength: 4})
    @IsString()
    @MinLength(4)
    password: string
}