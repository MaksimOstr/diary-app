import { PrismaService } from "@diary-app/prisma";
import { BadRequestException, ForbiddenException, Injectable } from "@nestjs/common";
import { User } from "@prisma/client";
import * as bcrypt from 'bcrypt'

@Injectable()
export class UserService {
    constructor(
        private readonly prismaService: PrismaService
    ) { }

    save(user: Partial<User>) {
        if (user.password === undefined || user.username === undefined) throw new BadRequestException()
        
        return this.prismaService.user.create({
            data: {
                username: user.username,
                password: bcrypt.hashSync(user.password, bcrypt.genSaltSync(10)),
                roles: ['USER']
            }
        })
    }

    async findOne(param: string) {
        const user = await this.prismaService.user.findFirst({
            where: {
                OR: [{ username: param }, { id: param }, { id: param }]
            }
        })
        if(!user) {
            throw new ForbiddenException()
        }
        return user
    }

    delete(id: string) {
        return this.prismaService.user.delete({
            where: { id }
        })
    }
}