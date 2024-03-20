import { BadRequestException, Injectable, Logger, UnauthorizedException } from "@nestjs/common";
import { AuthUserReqDto } from "./dto/authUserReq.dto";
import { UserService } from "@diary-app/user";
import { Tokens } from "./interfaces/interface";
import { compareSync } from "bcrypt";
import { JwtService } from "@nestjs/jwt";
import { Token } from "@prisma/client";
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
        return this.userService.save(dto).catch(error => {
            this.logger.error(error)
            throw new BadRequestException()
        })
    }

    async login(dto: AuthUserReqDto): Promise<Tokens> {
        const user = await this.userService.findOne(dto.username).catch(error => {
            this.logger.error(error)
            throw new UnauthorizedException()
        })
        if (!user || compareSync(dto.password, user.password)) {
            throw new UnauthorizedException('Username or password is incorrect')
        }
        const accessToken = this.jwtService.sign({
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
}