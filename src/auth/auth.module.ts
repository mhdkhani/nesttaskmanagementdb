import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import {UserRepository} from "./user.repository";
import {TypeOrmModule} from "@nestjs/typeorm";
import {User} from "./user.entity";
import {JwtModule} from "@nestjs/jwt";
import {PassportModule} from "@nestjs/passport";
import {JwtStrategy} from "./jwt.strategy";

@Module({
  imports: [
      PassportModule.register({defaultStrategy: 'jwt'}),
      JwtModule.register({
         secret: "customSecret1212" ,
         signOptions:{
             expiresIn: 3600,
         }
      }),
      TypeOrmModule.forFeature([User])
  ],
  controllers: [AuthController],
  providers: [AuthService,UserRepository,JwtStrategy],
  exports: [JwtStrategy,PassportModule],
})
export class AuthModule {}
