import { SetMetadata } from '@nestjs/common';
import { UsersRoleEnum } from 'src/modules/constants/constants.users';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: UsersRoleEnum[]) =>
  SetMetadata(ROLES_KEY, roles);
