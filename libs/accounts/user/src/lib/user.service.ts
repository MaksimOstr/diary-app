import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateUserDto } from "./dto/createUser.dto";
import { UserEntity } from "@diary-app/shared-api";
import * as bcrypt from 'bcrypt'

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private userRepository: Repository<UserEntity>
    ) {}

    async findAll(): Promise<UserEntity[]> {
        return await this.userRepository.find()
    }

    async findOne(id: number): Promise<UserEntity | null> {
        return await this.userRepository.findOneBy({ id })
    }

    async createUser(data: CreateUserDto) {
        const existUser = await this.userRepository.findOne({
            where: {
                username: data.username
            }
        })
        if (existUser) throw new BadRequestException('This username already exist!')

        return await this.userRepository.save({
            username: data.username,
            password: await bcrypt.hashSync(data.password, 10)
        })
    }
}