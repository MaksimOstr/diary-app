import { Account, SignUpDto, AuthService } from "@diary-app/auth-api";
import { Controller, Post, Req, Body, HttpCode, HttpStatus } from "@nestjs/common";


@Controller('account')
export class AccountsController {
    constructor(
        private AuthService: AuthService
    ) {}

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async create(
        @Req() request: SignUpDto,
        @Body() data: Partial<Account>
    ) {
        return await this.AuthService.create(data)
    }
}