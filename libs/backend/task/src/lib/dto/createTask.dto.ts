import { TaskStatus } from "@prisma/client"
import { IsNotEmpty, IsString, isString, MinLength, IsEnum } from "class-validator"
import { ApiProperty } from "@nestjs/swagger"

export class CreateTaskDto {
    constructor() {
        this.title = ''
        this.description = ''
        this.status = "NEUTRAL"
    }

    @ApiProperty()
    @IsString()
    title: string

    @ApiProperty()
    description: string

    @ApiProperty({enum: TaskStatus})
    @IsEnum(TaskStatus)
    status: TaskStatus
}