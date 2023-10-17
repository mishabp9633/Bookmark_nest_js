import {
  Body,
  Controller,
  HttpCode,
  HttpException,
  Post,
  Req,
} from '@nestjs/common';
import { Request } from 'express';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  // @Post('signup')
  // signUp(@Req() req:Request){
  //     const userData = req.body

  //     return this.authService.signUp()
  // }
  
  // @HttpCode(HttpStatus.OK)
  @HttpCode(200)
  @Post('signup')
  signUp(@Body() userData: AuthDto) {
    return this.authService.signUp(userData);
  }

  @HttpCode(200)
  @Post('signin')
  login(@Body() userData: AuthDto ) {
    return this.authService.login(userData);
  }
}
