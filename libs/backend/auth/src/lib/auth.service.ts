import { BadRequestException, ConflictException, Injectable, Logger, UnauthorizedException } from "@nestjs/common";
import { AuthUserReqDto } from "./dto/authUserReq.dto";
import { UserService } from "@diary-app/user";
import { Tokens } from "./interfaces/interface";
import { compareSync } from "bcrypt";
import { JwtService } from "@nestjs/jwt";
import { Token, User } from "@prisma/client";
import { PrismaService } from "@diary-app/prisma";
import { v4 } from 'uuid';
import { add } from 'date-fns';

@Injectable()
export class AuthService {
    private readonly logger = new Logger(AuthService.name)
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
        private readonly prismaService: PrismaService
    ) {

    }

    async register(dto: AuthUserReqDto) {
        const user = await this.userService.findOne(dto.username).catch(error => {
            this.logger.error(error)
            return null
        })
        if (user) {
            throw new ConflictException('User already exists!')
        }

        return this.userService.save(dto).catch(error => {
            this.logger.error(error)
            throw new BadRequestException('This user already exists!')
        })
    }

    async login(dto: AuthUserReqDto, agent: string): Promise<Tokens> {
        const user = await this.userService.findOne(dto.username).catch(error => {
            this.logger.error(error)
            return null
        })
        if (!user || !compareSync(dto.password, user.password)) throw new UnauthorizedException('Username or password is incorrect')

        return this.generateTokens(user, agent)
    }

    private async generateTokens(user: User, agent: string): Promise<Tokens> {
        const accessToken =
            'Bearer ' +
            this.jwtService.sign({
                id: user.id,
                email: user.username,
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
        if(!refreshToken) throw new UnauthorizedException()

        const token = await this.prismaService.token.delete({ where: { token: refreshToken } });

        if (!token || new Date(token.exp) < new Date()) {
            throw new UnauthorizedException();
        }
        const user = await this.userService.findOne(token.userId);
        return this.generateTokens(user, agent);
    }
}