import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from 'src/modules/apis/users/decorators/users-roles.decorator';
import { UsersRepository } from 'src/modules/repositories/users.repository';
import { UsersRoleEnum } from 'src/modules/constants/constants.users';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private readonly usersRepository: UsersRepository,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.getAllAndOverride<UsersRoleEnum[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    const req = context.switchToHttp().getRequest();

    const { user } = req;

    const token = req?.headers?.authorization?.split(' ')[1];

    const iUser = await this.usersRepository.findUserByID(user.id);

    if (!iUser || !iUser?.token?.includes(token)) {
      throw new UnauthorizedException('token expired.');
    }

    if (!roles) {
      // Update last acti
      this.usersRepository.update(iUser.id, { lastActi: new Date() });
      return true;
    }

    // Update last acti
    this.usersRepository.update(iUser.id, { lastActi: new Date() });

    return true;
  }
}
