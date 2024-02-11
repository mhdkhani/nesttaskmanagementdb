import { Injectable } from '@nestjs/common';
import {UserRepository} from "./user.repository";
import {AuthCredentialsDto} from "./dto/auth-credentials.dto";
import {JwtService} from "@nestjs/jwt";

@Injectable()
export class AuthService {
    // @ts-ignore
    @InjectRepository(UserRepository)
    constructor(
        private userRepository: UserRepository,
        private jwtService: JwtService
    ) {}

    async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void>{
        return this.userRepository.signUp(authCredentialsDto);
    }

    async loginUser(authCredentialsDto: AuthCredentialsDto): Promise<{ accessToken: string}>{
        let username = await this.userRepository.loginUser(authCredentialsDto);
        let token = await this.jwtService.sign(username);
        return {accessToken: token}
    }
}
