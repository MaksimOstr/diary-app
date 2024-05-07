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
        return await this.prismaService.task.create({
            data: {
                title: dto.title,
                description: dto.description,
                userId,
                status: dto.status
            },
            select: { id: true, title: true, description: true, createdAt: true, status: true }
        })
    }

    async getTasks(userId: string) {
         return this.prismaService.task.findMany({
            where: { userId },
            select: { id: true, title: true, description: true, createdAt: true, status: true }
         })
    }

    async getTaskById(taskId: string): Promise<Partial<Task> | null> {
        return this.prismaService.task.findUnique({
            where: { id: taskId },
            select: { id: true, title: true, description: true, createdAt: true, status: true }
        })
    }
    async changeTask(taskId: string, data: CreateTaskDto) {
        return this.prismaService.task.update({
            where: { id: taskId },
            data: {
                title: data.title,
                description: data.description,
                status: data.status
            }
        })
    }

    async deleteTask(taskId: string): Promise<Task> {
        return this.prismaService.task.delete({
            where: { id: taskId }
        })
    }
}