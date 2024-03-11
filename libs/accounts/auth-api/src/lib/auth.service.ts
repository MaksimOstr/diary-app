import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Account } from "./model/account.entity";
import * as argon2 from 'argon2'

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(Account)
        private accounts: Repository<Account>
    ) { }

    async create(data: Partial<Account>) {
        const userExist = await this.accounts.findOne({
            where: {
                username: data.username
            }
        })
        if (!userExist) {
            const user = await this.accounts.save({
                username: data.username,
                password: await argon2.hash(data.password || '')
            })
            return user
        }
        throw new BadRequestException('This username already exists')
    }

}
