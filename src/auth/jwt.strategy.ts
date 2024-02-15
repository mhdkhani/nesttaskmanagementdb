import { PassportStrategy } from '@nestjs/passport';
import { Strategy , ExtractJwt } from 'passport-jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import {UserRepository} from "./user.repository";
import {JwtPayloadInterface} from "./jwt-payload.interface";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private userRepository: UserRepository) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: 'customSecret1212'
        });
    }

    async validate(payload: JwtPayloadInterface): Promise<any> {
        const username = payload.username;
        const user = await this.userRepository.findOne({where:{username: username }});
        if (!user) {
            throw new UnauthorizedException();
        }
        return {username:payload.username,id:user.id};
    }
}