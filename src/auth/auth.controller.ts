import {Controller, Post, Body, ValidationPipe, Req, UseGuards} from '@nestjs/common';
import {AuthCredentialsDto} from "./dto/auth-credentials.dto";
import {AuthService} from "./auth.service";
import {AuthGuard} from "@nestjs/passport";
import {GetUser} from "./get-user.decorator";
import {User} from "./user.entity";

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) {}
    @Post('/signup')
    signUp(@Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto): Promise<void>{
        return this.authService.signUp(authCredentialsDto);
    }

    @Post('/login')
    login(@Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto): Promise<{ accessToken: string}>{
        return this.authService.loginUser(authCredentialsDto);
    }

    @Post('/test')
    @UseGuards(AuthGuard())
    //test(@Req() req){
    test(@GetUser() user: User){
       console.log('sddddddd')
       console.log(user)
    }

}
