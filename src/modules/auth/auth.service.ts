import { HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AuthDto } from './dto';
import * as argon from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

  async signUp(userData: AuthDto) {
    const findUser = await this.prisma.user.findUnique({
      where: {
        email: userData.email,
      },
    });

    if (findUser) throw new HttpException(`Credentials taken`, 400);
    const hash = await argon.hash(userData.password);

    const user = await this.prisma.user.create({
      data: {
        email: userData.email,
        hash,
      },
      // select: {
      //   id: true,
      //   email: true,
      //   createdAt: true,
      // },
    });
    delete user.hash;
    return { user };
  }

  async login(userData: AuthDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: userData.email,
      },
    });
    if (!user) throw new HttpException(`Credentials incorrect`, 400);

    const passMatch = await argon.verify(user.hash, userData.password);

    if (!passMatch) throw new HttpException(`Credentials incorrect`, 400);

    return this.signToken(user.id, user.email);
  }

  async signToken(
    id: number,
    email: string
  ): Promise<{access_token}>{
    const payload = {
        sub: id,
        email
    }
    const secret = this.config.get('JWT_SECRET') 
    const expiresIn = this.config.get('JWT_EXPIRES_TIME')

    const token = await this.jwt.signAsync(payload, {
        expiresIn: expiresIn,
        secret: secret
    }) 
    return {
        access_token: token 
    }
  }
}
