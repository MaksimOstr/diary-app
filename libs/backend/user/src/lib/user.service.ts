import { PrismaService } from "@diary-app/prisma";
import { BadRequestException, ForbiddenException, Injectable, UnauthorizedException } from "@nestjs/common";
import { User } from "@prisma/client";
import * as bcrypt from 'bcrypt'

@Injectable()
export class UserService {
    constructor(
        private readonly prismaService: PrismaService
    ) { }

    save(user: Partial<User>): Promise<User> {
        if (user.password === undefined || user.username === undefined) throw new BadRequestException()
        
        return this.prismaService.user.create({
            data: {
                username: user.username,
                password: bcrypt.hashSync(user.password, bcrypt.genSaltSync(10)),
                roles: ['USER']
            }
        })
    }

    async findOne(param: string): Promise<User | null>{
        console.log(param)
        const user = await this.prismaService.user.findFirst({
            where: {
                OR: [{ username: param }, { id: param }]
            }
        })
        return user
    }

    delete(id: string) {
        return this.prismaService.user.delete({
            where: { id }, select: { id: true }
        })
    }
}