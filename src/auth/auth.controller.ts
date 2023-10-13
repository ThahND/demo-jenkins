import { Body, Controller, Post } from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { AuthService } from './auth.service';
import TokenResponseDto from './dto/token-response.dto';
import { SignInDto } from './dto/sign-in.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-in')
  @ApiOperation({ summary: '| Login' })
  @ApiCreatedResponse({ type: TokenResponseDto })
  async signIn(@Body() data: SignInDto) {
    return await this.authService.signIn(data);
  }

  @Post('sign-out')
  @ApiOperation({ summary: '| Logout' })
  @ApiOkResponse()
  async signout() {
    return;
  }
}
