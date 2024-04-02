import { Body, ClassSerializerInterceptor, Controller, Get, HttpStatus, Post, Res, UnauthorizedException, UseGuards, UseInterceptors } from "@nestjs/common";
import { AuthUserReqDto } from "./dto/authUserReq.dto";
import { AuthService } from "./auth.service";
import { Tokens } from "./interfaces/interface";
import { Response } from "express";
import { ConfigService } from "@nestjs/config";
import { Cookie, CurrentUser, JwtPayload, Public, Roles, UserAgent } from "shared-backend";
import { Role, User } from "@prisma/client";
import { UserResponse } from "shared-backend";
import { JwtAuthGuard } from "./guards/jwt-auth.guard";




@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly configService: ConfigService
    ) { }

    @Public()
    @UseInterceptors(ClassSerializerInterceptor)
    @Post('register')
    async register(@Body() dto: AuthUserReqDto): Promise<User> {
        const user = await this.authService.register(dto)
        return new UserResponse(user)
    }

    @Public()
    @Post('login')
    async login(
        @Body() dto: AuthUserReqDto,
        @Res() res: Response,
        @UserAgent() agent: string
    ) {
        const tokens = await this.authService.login(dto, agent)
        this.setRefreshTokenToCookies(tokens, res)
        return tokens
    }

    @Public()
    @Get('refresh')
    async refreshTokens(
        @Cookie('refreshToken') refreshToken: string,
        @Res() res: Response,
        @UserAgent() agent: string
    ) {
        console.log(refreshToken)
        const tokens = await this.authService.refreshTokens(refreshToken, agent)
        this.setRefreshTokenToCookies(tokens, res)
    }


    @Get('logout')
    async logout(
        @Cookie('refreshToken') refreshToken: string,
        @Res() res: Response
    ) {
        await this.authService.deleteRefreshToken(refreshToken)
        res.cookie('refreshToken', '', { httpOnly: true, secure: true, expires: new Date() })
        res.sendStatus(HttpStatus.OK)
    }


    @Get('profile')
    getProfile(@CurrentUser() user: JwtPayload) {
        console.log(user)
        return user
    }

    private setRefreshTokenToCookies(tokens: Tokens, res: Response) {
        if (!tokens) {
            throw new UnauthorizedException()
        }
        res.cookie('refreshToken', tokens.refreshToken.token, {
            httpOnly: true,
            sameSite: 'none',
            expires: new Date(tokens.refreshToken.exp),
            path: '/',
            secure: true
        })
        res.status(HttpStatus.CREATED).json(tokens.accessToken)
    }
}