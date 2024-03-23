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

    async login(dto: AuthUserReqDto): Promise<Tokens> {
        const user = await this.userService.findOne(dto.username).catch(error => {
            this.logger.error(error)
            return null
        })
        if (!user || !compareSync(dto.password, user.password)) throw new UnauthorizedException('Username or password is incorrect')
        return this.generateTokens(user)
    }

    private async generateTokens(user: User): Promise<Tokens> {
        const accessToken = 'Bearer ' + this.jwtService.sign({
            id: user.id,
            username: user.username,
            roles: user.roles
        })
        const refreshToken = await this.getRefreshToken(user.id)

        return { accessToken, refreshToken }
    }

    private async getRefreshToken(userId: string): Promise<Token> {
        return this.prismaService.token.create({
            data: {
                token: v4(),
                exp: add(new Date(), { months: 1 }),
                userId
            }
        })
    }
    async refreshTokens(refreshToken: string): Promise<Tokens> {
        console.log(refreshToken)
        const token = await this.prismaService.token.delete({
            where: { token: refreshToken }
        })

        if (!token) {
            throw new UnauthorizedException()
        }
        
        const user = await this.userService.findOne(token.userId)
        return this.generateTokens(user)
    }
}