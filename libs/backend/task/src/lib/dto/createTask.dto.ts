import { IsNotEmpty, IsString, isString, MinLength,  } from "class-validator"

export class CreateTaskDto {
    constructor() {
        this.title = ''
        this.description = ''
    }

    @IsString()
    @MinLength(1)
    @IsNotEmpty()
    title: string


    @MinLength(1)
    @IsNotEmpty()
    description: string
}