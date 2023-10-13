import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { IUsers } from 'src/modules/interfaces/users.interface';

export class ResponseUserDto implements IUsers {
  @ApiProperty()
  @IsOptional()
  id?: string;

  @ApiProperty()
  @IsOptional()
  email?: string;

  @ApiProperty()
  @IsOptional()
  role?: string;

  @ApiProperty()
  @IsOptional()
  phoneNumber?: string;

  @ApiProperty()
  @IsOptional()
  firstName?: string;

  @ApiProperty()
  @IsOptional()
  lastName?: string;

  @ApiProperty()
  @IsOptional()
  fullName?: string;

  @ApiProperty()
  @IsOptional()
  avatar?: string;

  @ApiProperty()
  @IsOptional()
  accountStatus?: string;

  @ApiProperty()
  @IsOptional()
  lastActi?: Date;

  @ApiProperty()
  @IsOptional()
  df?: boolean;
}
