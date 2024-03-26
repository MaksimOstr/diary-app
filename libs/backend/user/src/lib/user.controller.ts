import { Body, ClassSerializerInterceptor, Controller, Delete, ForbiddenException, Get, Param, ParseUUIDPipe, Post, UseGuards, UseInterceptors } from "@nestjs/common";
import { UserService } from "./user.service";
import { User } from "@prisma/client";
import { UserResponse } from "./responses/user.response";
import { CurrentUser, JwtPayload } from "shared-backend";

@Controller('user')
export class UserController {
    constructor(
        private readonly userService: UserService
    ) { }

    @Post('')
    createUser(@Body() dto: any): Promise<User> {
        return this.userService.save(dto)
    }

    @UseInterceptors(ClassSerializerInterceptor)
    @Get(':idOrUsername')
    findOneUser(@Param('idOrUsername') idOrUsername: string): Promise<User | null> {
        return this.userService.findOne(idOrUsername)
    }

    @Delete(':id')
    async deleteUser(
        @Param('id', ParseUUIDPipe) id: string,
        @CurrentUser() user: JwtPayload
    ) {
        return await this.userService.delete(id, user)
    }
}
