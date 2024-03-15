import { Body, Controller, Get, HttpCode, HttpStatus, Param, ParseArrayPipe, ParseEnumPipe, ParseIntPipe, Post } from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto } from "./dto/createUser.dto";
import { ApiCreatedResponse, ApiResponse, ApiTags } from "@nestjs/swagger";
import { UserEntity } from "@diary-app/shared-api";



@ApiTags('users')
@Controller('users')
export class UserController {
    constructor(
        private readonly userService: UserService
    ) { }


    @Get()
    @HttpCode(HttpStatus.OK)
    @ApiResponse({ status: HttpStatus.OK, description: 'Users list' })
    async getUsers(): Promise<UserEntity[]> {
        return this.userService.findAll()
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @ApiCreatedResponse({
        status: HttpStatus.CREATED,
        description: 'Create user',
    })
    async createUser(
        @Body() data: CreateUserDto
    ): Promise<UserEntity> {
        return await this.userService.createUser(data)
    }

    @Get(':id')
    @HttpCode(HttpStatus.OK)
    async getUser(
        @Param(
            'id',
            new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE })
        ) id: number
    ): Promise<UserEntity | null> {
        return this.userService.findOne(id)
    }
}