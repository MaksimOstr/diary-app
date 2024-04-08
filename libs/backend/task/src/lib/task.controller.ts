import { Body, Controller, Delete, Get, Post } from "@nestjs/common";
import { CreateTaskDto } from "./dto/createTask.dto";
import { CurrentUser, JwtPayload } from "shared-backend";
import { TaskService } from "./task.service";
import { Task } from "@prisma/client";

@Controller('task')
export class TaskController {
    constructor(
        private readonly taskService: TaskService
    ) {}


    @Post('create')
    async createTask(
        @Body() data: CreateTaskDto,
        @CurrentUser() user: JwtPayload
    ) {
        return await this.taskService.createTask(data, user.id)
    }

    @Get()
    async getTasks(
        @CurrentUser() user: JwtPayload
    ) {
        return this.taskService.getTasks(user.id)
    }

    @Delete()
    async deleteTask(
        @Body() data: { taskId: string }
    ): Promise<Task> {
        return this.taskService.deleteTask(data.taskId)
    }
}