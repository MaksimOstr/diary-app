import { IsString, MinLength } from "class-validator"
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {

    constructor() {
        this.username = ''
        this.password = ''
    }
    @ApiProperty({
        default: 'test'
    })
    @IsString()
    @MinLength(3)
    username: string

    @ApiProperty({
        default: 'test'
    })
    @IsString()
    @MinLength(4)
    password: string
}