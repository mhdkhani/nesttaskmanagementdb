import { Injectable } from '@nestjs/common';
import {UserRepository} from "./user.repository";


@Injectable()
export class AuthService {
    // @ts-ignore
    @InjectRepository(UserRepository)
    constructor(private userRepository: UserRepository) {}
}
