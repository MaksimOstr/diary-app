import { Body, ClassSerializerInterceptor, Controller, Get, HttpCode, HttpStatus, Post, Put, Res, UnauthorizedException, UseGuards, UseInterceptors } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { Tokens } from "./interfaces/interface";
import { Response } from "express";
import { ConfigService } from "@nestjs/config";
import { AuthReqDto, Cookie, CurrentUser, JwtPayload, Public, Roles, UserAgent } from "shared-backend";
import { Role, User } from "@prisma/client";
import { UserResponse } from "shared-backend";
import { JwtAuthGuard } from "./guards/jwt-auth.guard";
import { server } from "globalShared";
import { ApiBasicAuth, ApiBearerAuth, ApiBody, ApiCookieAuth, ApiCreatedResponse, ApiHeader, ApiResponse, ApiTags } from "@nestjs/swagger";


@ApiBearerAuth()
@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly configService: ConfigService
    ) { }

    @ApiBody({ type: AuthReqDto })
    @Public()
    @ApiCreatedResponse({ description: 'New account was created' })
    @UseInterceptors(ClassSerializerInterceptor)
    @Post('register')
    async register(@Body() dto: AuthReqDto): Promise<User> {
        const user = await this.authService.register(dto)
        return new UserResponse(user)
    }

    @ApiBody({ type: AuthReqDto })
    @ApiResponse({ status: HttpStatus.OK, description: 'You successfully logged in the account' })
    @Public()
    @Post('login')
    async login(
        @Body() dto: AuthReqDto,
        @Res() res: Response,
        @UserAgent() agent: string
    ) {
        const tokens = await this.authService.login(dto, agent)
        this.setRefreshTokenToCookies(tokens, res)
        return tokens
    }

    @ApiResponse({ status: HttpStatus.OK, description: 'Tokens were successfully refreshed' })
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

    @ApiResponse({ status: HttpStatus.OK, description: 'You logged out from the account' })
    @Get('logout')
    async logout(
        @Cookie('refreshToken') refreshToken: string,
        @Res() res: Response
    ) {
        await this.authService.deleteRefreshToken(refreshToken)
        res.cookie('refreshToken', '', { httpOnly: true, secure: true })
        return res.json(HttpStatus.OK)
    }

    @ApiResponse({ status: HttpStatus.OK, description: 'Get your profile' })
    @Get('profile')
    getProfile(
        @CurrentUser() user: JwtPayload
    ) {
        console.log(user)
        return user
    }

    @ApiResponse({ status: HttpStatus.OK, description: 'Username was changed' })
    @Put('/changeUsername')
    async changeUser(
        @CurrentUser() user: JwtPayload,
        @Body() data: { username: string },
        @Res() res: Response
    ) {
        const token = await this.authService.changeUsername(data.username, user)
        res.json({ access_token: token.accessToken })
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
        res.json({ access_token: tokens.accessToken })
    }

    @Post('/confirmPassword')
    async confirmPassword(
        @CurrentUser() user: JwtPayload,
        @Body() data: {password: string},
        @Res() res: Response
    ) {
        await this.authService.confirmPassword(user.username, data.password)
        return res.json(HttpStatus.OK)
    }

    @ApiResponse({ status: HttpStatus.OK, description: 'Password was changed' })
    @Put('/changePassword')
    async changePassword(
        @CurrentUser() user: JwtPayload,
        @Body() data: {password: string},
        @Res() res: Response
    ) {
        console.log(data)
        await this.authService.changePassword(user.id, data.password)
        return res.json(HttpStatus.OK)
    }
}