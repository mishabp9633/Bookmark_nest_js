import { Controller, Get, HttpCode, HttpStatus, Put, UseGuards } from '@nestjs/common';
import { User } from '@prisma/client';
import { GetUser } from '../auth/decorator';
import { JwtGuard } from '../auth/guard';

@UseGuards(JwtGuard)
@Controller('user')
export class UserController {

    
    @Get('me')
    userProfile(@GetUser() user:User){        
    // userProfile(@GetUser('email') email:string){        
        return user; 
    }

    @Put('update')
    userProfileUpdate(){        
        return 'user update';
    }
}
