import { Body, ClassSerializerInterceptor, Controller, Delete, Get, Param, ParseIntPipe, ParseUUIDPipe, Post, Put, UseGuards, UseInterceptors } from "@nestjs/common";
import { UserService } from "./user.service";
import { User } from "@prisma/client";
import { CurrentUser, JwtPayload } from "shared-backend";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";

@ApiTags('user')
@ApiBearerAuth()
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
