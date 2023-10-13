import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import IJwtPayload from './payloads/jwt-payload';
import * as bcrypt from 'bcrypt';
import { jwtConfig } from 'src/configs/configs.constants';
import { UsersRepository } from 'src/modules/repositories/users.repository';
import { SignInDto } from './dto/sign-in.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersRepository: UsersRepository,
  ) {}

  async signIn(data: SignInDto) {
    const { email, password } = data;

    const user = await this.usersRepository.findOneBy({ email, password });

    if (!user) throw new BadRequestException('Account incorrect.');

    const { accessToken } = await this.generateTokenLogin({
      id: user.id,
      email,
      role: user.role,
    });

    const token = user.token || [];
    token.push(accessToken);

    await this.usersRepository.update(user.id, { token });

    return { accessToken };
  }

  async hashPassword(password: string) {
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);

    return { salt, hashPassword };
  }

  async generateTokenLogin(userInfo: IJwtPayload) {
    const accessTokenPayload: IJwtPayload = {
      id: userInfo.id,
      email: userInfo.email,
      role: userInfo.role,
    };
    const accessTokenOptions: JwtSignOptions = jwtConfig;

    const accessToken = await this.jwtService.signAsync(
      accessTokenPayload,
      accessTokenOptions,
    );

    return { accessToken };
  }

  async generateTokenCustom(
    userInfo: IJwtPayload,
    secret: string,
    expiresIn: string | number,
  ) {
    const accessTokenPayload: IJwtPayload = {
      id: userInfo.id,
      email: userInfo.email,
      role: userInfo.role,
    };

    const accessTokenOptions: JwtSignOptions = { secret, expiresIn };

    const accessToken = await this.jwtService.signAsync(
      accessTokenPayload,
      accessTokenOptions,
    );

    return { accessToken };
  }

  async verifyTokenCustom(token: string, secret: string) {
    try {
      await this.jwtService.verifyAsync(token, { secret });

      return true;
    } catch (e) {
      return false;
    }
  }
}
