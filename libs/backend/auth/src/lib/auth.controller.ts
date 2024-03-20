import { Body, Controller, Get, Post } from "@nestjs/common";
import { AuthUserReqDto } from "./dto/authUserReq.dto";

@Controller('auth')
export class AuthController {
    @Post('register')
    register(@Body() dto: AuthUserReqDto) {
        
    }

    @Post('login')
    login(@Body() dto: AuthUserReqDto) {

    }

    @Get('refresh')
    refreshTokens() {

    }
}