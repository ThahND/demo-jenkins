import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiConsumes,
} from '@nestjs/swagger';
import { Controller, Get, UseGuards, VERSION_NEUTRAL } from '@nestjs/common';
import { UsersService } from './users.service';
import { ResponseUserDto } from './dto/response-users.dto';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/auth/guards/roles.guard';

@ApiTags('Users')
// @ApiBearerAuth()
// @UseGuards(AuthGuard('jwt'), RolesGuard)
// @Controller('user')
@Controller({ version: [VERSION_NEUTRAL, '1'], path: 'user' })
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('list')
  @ApiOperation({ summary: '| Get list user' })
  @ApiOkResponse({ type: [ResponseUserDto] })
  async findUsers() {
    return await this.usersService.findUsers();
  }
}
