import { PrismaService } from "@diary-app/prisma";
import { Injectable } from "@nestjs/common";
import { CreateTaskDto } from "./dto/createTask.dto";
import { Task } from "@prisma/client";

@Injectable()
export class TaskService {
    constructor(
        private readonly prismaService: PrismaService
    ) {}


    async createTask(dto: CreateTaskDto, userId: string) {
        console.log(dto.description.length)
        return await this.prismaService.task.create({
            data: {
                title: dto.title,
                description: dto.description,
                userId
            }
        })
    }

    async getTasks(userId: string) {
         return this.prismaService.task.findMany({
            where: { userId }
         })
    }

    async deleteTask(taskId: string): Promise<Task> {
        return this.prismaService.task.delete({
            where: { id: taskId }
        })
    }
}