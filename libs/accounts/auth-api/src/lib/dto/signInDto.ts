import { IsString, MinLength } from "class-validator"
import { ApiProperty } from '@nestjs/swagger';

export class SignInDto {

    constructor() {
        this.username = ''
        this.password = ''
    }
    @ApiProperty()
    @IsString()
    @MinLength(3)
    username: string

    @ApiProperty()
    @IsString()
    @MinLength(4)
    password: string
}