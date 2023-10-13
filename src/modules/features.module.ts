import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UploadsService } from './apis/uploads/uploads.service';
import { EventsGateway } from './gatewaies/events.gateway';
import { JwtModule } from '@nestjs/jwt';
import { jwtConfig } from 'src/configs/configs.constants';
import { UsersEntity } from './entities/users.entity';
import { UsersController } from './apis/users/users.controller';
import { UsersRepository } from './repositories/users.repository';
import { UsersService } from './apis/users/users.service';
import { UploadsController } from './apis/uploads/uploads.controller';

@Module({
  imports: [
    JwtModule.register({
      secret: jwtConfig.secret,
      signOptions: { expiresIn: jwtConfig.expiresIn },
    }),
    TypeOrmModule.forFeature([UsersEntity]),
  ],
  controllers: [UploadsController, UsersController],
  providers: [
    // Repositories
    UsersRepository,

    // Services
    UploadsService,
    UsersService,

    // Socket
    EventsGateway,

    // Mail
  ],
  exports: [UsersService],
})
export class FeaturesModule {}
