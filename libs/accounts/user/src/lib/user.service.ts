import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "./entities/user.entity";
import { Repository } from "typeorm";
import { CreateUserDto } from "./dto/createUser.dto";

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity) 
            private userRepository: Repository<UserEntity>
    ) {}

    async createUser(data: CreateUserDto) {
        return this.userRepository.save(data)
    }
}