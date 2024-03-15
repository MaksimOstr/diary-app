import { Body, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { SignInDto } from "./dto/signInDto";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { IToken } from "./types/types";


@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService  
    ) {}

    @Post('login')
    @HttpCode(HttpStatus.OK)
    @ApiResponse({ status: HttpStatus.OK, description: 'Sign In' })
    signIn(
        @Body() signInDto: SignInDto
    ): Promise<IToken>  {
        return this.authService.signIn(signInDto)
    }

}