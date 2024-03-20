import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post } from "@nestjs/common";
import { UserService } from "./user.service";

@Controller('user')
export class UserController {
    constructor(
        private readonly userService: UserService
    ) { }

    @Post('')
    createUser(@Body() dto: any) {
        return this.userService.save(dto)
    }

    @Get(':idOrUsername')
    findOneUser(@Param('idOrUsername') idOrUsername: string) {
        return this.userService.findOne(idOrUsername)
    }

    @Delete(':id')
    deleteUser(@Param('id', ParseUUIDPipe) id: string) {
        return this.userService.delete(id)
    }
}
