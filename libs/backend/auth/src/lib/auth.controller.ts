import { BadRequestException, Body, Controller, Get, HttpStatus, Post, Req, Res, UnauthorizedException } from "@nestjs/common";
import { AuthUserReqDto } from "./dto/authUserReq.dto";
import { AuthService } from "./auth.service";
import { Tokens } from "./interfaces/interface";
import { Response, Request } from "express";
import { ConfigService } from "@nestjs/config";
import { Cookie, UserAgent } from "shared-backend";

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly configService: ConfigService
    ) { }

    @Post('register')
    async register(@Body() dto: AuthUserReqDto) {
        return await this.authService.register(dto)
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