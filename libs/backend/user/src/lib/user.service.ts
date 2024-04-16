import { PrismaService } from "@diary-app/prisma";
import { CACHE_MANAGER } from "@nestjs/cache-manager";
import { BadRequestException, ForbiddenException, Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { Role, User } from "@prisma/client";
import * as bcrypt from 'bcrypt'
import { JwtPayload } from "shared-backend";
import { Cache } from 'cache-manager'
import { ConfigService } from "@nestjs/config";

@Injectable()
export class UserService {
    constructor(
        private readonly configService: ConfigService,
        private readonly prismaService: PrismaService,
        @Inject(CACHE_MANAGER) private cacheManager: Cache
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

    async findOne(param: string, isReset = false): Promise<User | null> {
        if (isReset) {
            await this.cacheManager.del(param)
        }

        const user = await this.cacheManager.get<User>(param)

        if (!user) {
            console.log(this.configService.get('CACHE_EXP'))
            const user = await this.prismaService.user.findFirst({
                where: {
                    OR: [{ username: param }, { id: param }],
                }
            })

            if (!user) return null

            console.log('dspdfssf')
            await this.cacheManager.set(param, user, this.configService.get('CACHE_EXP'))
            return user
        }
        return user
    }


    async delete(id: string, user: JwtPayload) {
        if (user.id !== id && !user.roles.includes(Role.ADMIN)) {
            throw new ForbiddenException()
        }
        await Promise.all([
            this.cacheManager.del(id),
            this.cacheManager.del(user.username)
        ])
        return this.prismaService.user.delete({
            where: { id }, select: { id: true }
        })
    }
}