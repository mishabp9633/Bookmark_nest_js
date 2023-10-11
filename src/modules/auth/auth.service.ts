import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { AuthDto } from "./dto";
import * as argon from 'argon2'

@Injectable()
export class AuthService{
    constructor(private prisma:PrismaService){
    }
   async signUp(userData: AuthDto){
        const hash = await argon.hash(userData.password)

        const user = await this.prisma.user.create({
            data: {
                email: userData.email,
                hash
            }
        })
        return {user}
    }

   async login(){
        return {msg: 'Login success'}
    }
}