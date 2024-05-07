import { BadRequestException, ConflictException, ForbiddenException, Injectable, Logger, UnauthorizedException } from "@nestjs/common";
import { UserService } from "@diary-app/user";
import { Tokens } from "./interfaces/interface";
import { compare, compareSync, genSalt, genSaltSync, hashSync } from "bcrypt";
import { JwtService } from "@nestjs/jwt";
import { Token, User } from "@prisma/client";
import { PrismaService } from "@diary-app/prisma";
import { v4 } from 'uuid';
import { add } from 'date-fns';
import { AuthReqDto, JwtPayload } from "shared-backend";

@Injectable()
export class AuthService {
    private readonly logger = new Logger(AuthService.name)
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
        private readonly prismaService: PrismaService
    ) {

    }

    async register(dto: AuthReqDto): Promise<User> {
        const user = await this.userService.findOne(dto.username)
        if (user) {
            throw new BadRequestException('User already exists!')
        }

        return this.userService.save(dto)
    }

    async login(dto: AuthReqDto, agent: string): Promise<Tokens> {
        const user = await this.userService.findOne(dto.username, true).catch(error => {
            this.logger.error(error)
            return null
        })
        console.log(user?.password)
        if (!user || !compareSync(dto.password, user.password)) throw new UnauthorizedException('Username or password is incorrect')

        return this.generateTokens(user, agent)
    }

    private async generateTokens(user: User, agent: string): Promise<Tokens> {
        const accessToken =
            this.jwtService.sign({
                id: user.id,
                username: user.username,
                roles: user.roles,
            });
        const refreshToken = await this.getRefreshToken(user.id, agent);
        return { accessToken, refreshToken };
    }

    private async getRefreshToken(userId: string, agent: string): Promise<Token> {
        const _token = await this.prismaService.token.findFirst({
            where: {
                userId,
                userAgent: agent,
            },
        });
        const token = _token ? _token.token : ''

        return await this.prismaService.token.upsert({
            where: { token },
            update: {
                token: v4(),
                exp: add(new Date(), { months: 1 }),
            },
            create: {
                token: v4(),
                exp: add(new Date(), { months: 1 }),
                userId,
                userAgent: agent,
            },
        });
    }

    async refreshTokens(refreshToken: string, agent: string): Promise<Tokens> {
        
        if (!refreshToken) throw new UnauthorizedException()

        const token = await this.prismaService.token.delete({ where: { token: refreshToken } });
        if (!token || new Date(token.exp) < new Date()) {
            throw new UnauthorizedException();
        }
        const user = await this.userService.findOne(token.userId);

        if (!user) throw new UnauthorizedException()

        return this.generateTokens(user, agent);
    }

    deleteRefreshToken(token: string) {
        return this.prismaService.token.delete({ 
            where: { token }
         })
    }

    async changeUsername(username: string, user: JwtPayload): Promise<Partial<Tokens>> {
        const isExists = await this.userService.findOne(username)
        if(isExists) throw new ForbiddenException('User with this username already exists!')
        
        const access_token = this.jwtService.sign({
            id: user.id,
            username: username,
            roles: user.roles,
        })
        await this.prismaService.user.update({
            where: { id: user.id },
            data: { username }
        })
        return { accessToken: access_token }
    }

    async confirmPassword(username: string, password: string) {
        const user = await this.userService.findOne(username)
        if(!user || !compareSync(password, user.password)) throw new ForbiddenException('Password not confirmed!')
            
        return null
    }

    async changePassword(userId: string, password: string) {
        const user = await this.userService.findOne(userId)
        if(!user || await compare(password, user.password)) throw new ForbiddenException("Your password is the same as your current one!")

        return this.prismaService.user.update({
            where: { id: userId },
            data: { password: hashSync(password, genSaltSync(10)) }
        })
    }
}