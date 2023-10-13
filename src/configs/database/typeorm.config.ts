import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { databaseConfig } from '../configs.constants';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: databaseConfig.host,
  port: +databaseConfig.port,
  username: databaseConfig.username,
  password: databaseConfig.password,
  database: databaseConfig.database,

  // entities: [__dirname + '/../../modules/entities/*.entity{.js,.ts}'],
  autoLoadEntities: true, // can use it if only one db
  synchronize: databaseConfig.synchronize === 'true',
  logging: false,
  // charset: 'utf8mb4', // use for mysql
};
