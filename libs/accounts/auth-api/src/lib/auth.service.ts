import { UserEntity } from "@diary-app/shared-api";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { SignInDto } from "./dto/signInDto";
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt';
import { IToken } from "./types/types";

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserEntity)
            private userRepository: Repository<UserEntity>,
            private jwtService: JwtService
    ) {}

    async signIn(data: SignInDto): Promise<IToken> {
        const user = await this.userRepository.findOne({
            where: {
                username: data.username
            }
        })
        if(!user) {
            throw new UnauthorizedException('User is not found')
        }
        const validPassword = bcrypt.compareSync(data.password, user.password || '')
        if(!validPassword) throw new UnauthorizedException('Username or password is incorrect')
        const payload = { sub: user.id, username: user.username };
        return {
            access_token: await this.jwtService.signAsync(payload)
        }
      }
}