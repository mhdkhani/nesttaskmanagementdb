import { Injectable } from '@nestjs/common';
import {UserRepository} from "./user.repository";
import {AuthCredentialsDto} from "./dto/auth-credentials.dto";


@Injectable()
export class AuthService {
    // @ts-ignore
    @InjectRepository(UserRepository)
    constructor(private userRepository: UserRepository) {}

    async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void>{
        return this.userRepository.signUp(authCredentialsDto);
    }

    async loginUser(authCredentialsDto: AuthCredentialsDto): Promise<string>{
        return this.userRepository.loginUser(authCredentialsDto);
    }
}
