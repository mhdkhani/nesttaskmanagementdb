import {Repository} from "typeorm";
import {User} from "./user.entity";
import {ConflictException, ForbiddenException, Injectable, InternalServerErrorException} from "@nestjs/common";
import {AuthCredentialsDto} from "./dto/auth-credentials.dto";
import { DataSource } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserRepository extends Repository<User>{

    constructor(private dataSource: DataSource) {
        super(User, dataSource.createEntityManager());
    }
    async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void>{
        const { username , password } = authCredentialsDto;
        const user = new User();
        /*const exist = await this.createQueryBuilder('user')
            .where("user.username = :username", { username: username })
            .getOne();
        if (exist){
            throw new ForbiddenException('user with this username already exist.')
        }*/
        user.username = username;
        user.salt = await bcrypt.genSalt();
        user.password = await this.HashPassword(password,user.salt);
        try{
            await user.save();
        }catch (error){
            if (error.code == 23505){
                throw new ConflictException('user with this username already exist.')
            }else{
                throw new InternalServerErrorException()
            }
        }
    }

    async loginUser(authCredentialsDto: AuthCredentialsDto): Promise<string> {
        const { username , password } = authCredentialsDto;
        const user = await this.createQueryBuilder('user')
            .where("user.username = :username", {username: username})
            .getOne();
        if (!user) {
            throw new ForbiddenException('user with this username not exist.')
        }
        if (!await this.validatePassword(password,user.password,user.salt)){
            throw new ForbiddenException('password is incorrect.')
        }
        return user.username;
    }

    private async validatePassword(postedPassword: string, userHashedPassword: string , userSalt: string): Promise<boolean>{
        let newHash = await this.HashPassword(postedPassword,userSalt);
        return newHash === userHashedPassword;
    }

    private async HashPassword(password: string, salt: string): Promise<string>{
        return await bcrypt.hash(password,salt);
    }
}