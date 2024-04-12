import { IsNotEmpty, IsString, isString, MinLength,  } from "class-validator"

export class CreateTaskDto {
    constructor() {
        this.title = ''
        this.description = ''
    }

    @IsString()
    title: string

    description: string
}