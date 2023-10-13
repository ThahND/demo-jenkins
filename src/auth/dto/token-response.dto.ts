import { ApiProperty } from '@nestjs/swagger';

export default class TokenResponseDto {
  @ApiProperty()
  accessToken: string;
}
