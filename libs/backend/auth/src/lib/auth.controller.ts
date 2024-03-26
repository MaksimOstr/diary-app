import { Body, ClassSerializerInterceptor, Controller, Get, HttpStatus, Post, Res, UnauthorizedException, UseInterceptors } from "@nestjs/common";
import { AuthUserReqDto } from "./dto/authUserReq.dto";
import { AuthService } from "./auth.service";
import { Tokens } from "./interfaces/interface";
import { Response } from "express";
import { ConfigService } from "@nestjs/config";
import { Cookie, Public, UserAgent } from "shared-backend";
import { User } from "@prisma/client";
import { UserResponse } from "@diary-app/user";

@Public()
@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly configService: ConfigService
    ) { }

    @UseInterceptors(ClassSerializerInterceptor)
    @Post('register')
    async register(@Body() dto: AuthUserReqDto): Promise<User> {
        const user = await this.authService.register(dto)
        return new UserResponse(user)
    }

    @Post('login')
    async login(
        @Body() dto: AuthUserReqDto,
        @Res() res: Response,
        @UserAgent() agent: string
    ) {
        const tokens = await this.authService.login(dto, agent)
        this.setRefreshTokenToCookies(tokens, res)
    }

    @Get('refresh')
    async refreshTokens(
        @Cookie('refreshToken') refreshToken: string,
        @Res() res: Response,
        @UserAgent() agent: string
    ) {
        const tokens = await this.authService.refreshTokens(refreshToken, agent)
        this.setRefreshTokenToCookies(tokens, res)
    }

    private setRefreshTokenToCookies(tokens: Tokens, res: Response) {
        if (!tokens) {
            throw new UnauthorizedException()
        }
        res.cookie('refreshToken', tokens.refreshToken.token, {
            httpOnly: true,
            sameSite: 'lax',
            expires: new Date(tokens.refreshToken.exp),
            secure: this.configService.get('NODE_ENV', 'development') === 'production',
            path: '/'
        })
        res.status(HttpStatus.CREATED).json({ access_token: tokens.accessToken })
    }
}