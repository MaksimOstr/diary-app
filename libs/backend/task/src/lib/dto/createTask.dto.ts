import { TaskStatus } from "@prisma/client"
import { IsNotEmpty, IsString, isString, MinLength,  } from "class-validator"

export class CreateTaskDto {
    constructor() {
        this.title = ''
        this.description = ''
        this.status = "NEUTRAL"
    }

    @IsString()
    title: string

    description: string

    status: TaskStatus
}