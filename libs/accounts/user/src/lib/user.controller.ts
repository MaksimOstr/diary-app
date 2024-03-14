import { Body, Controller, Get, Post } from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto } from "./dto/createUser.dto";
import { UserEntity } from "./entities/user.entity";

@Controller('users')
export class UserController {
    constructor(
        private readonly userService: UserService
    ) {}

    @Post()
    async createUser(
        @Body() data: CreateUserDto
    ): Promise<UserEntity> {
        return await this.userService.createUser(data)
    }
}