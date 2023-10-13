import { Injectable } from '@nestjs/common';
import { UsersRepository } from 'src/modules/repositories/users.repository';
import { DataSource } from 'typeorm';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
  constructor(
    private readonly usersRepository: UsersRepository,

    private readonly jwtService: JwtService,
    private dataSource: DataSource,
  ) {}

  /**   =====   -----   v   -----    =====   */

  async findUsers() {
    return await this.usersRepository.find();
  }
}
