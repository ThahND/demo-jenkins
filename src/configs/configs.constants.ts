import { config } from 'dotenv';
config();

export const databaseConfig = {
  database: process.env.SQL_DATABASE,
  host: process.env.SQL_HOST,
  port: process.env.SQL_PORT,
  username: process.env.SQL_USER,
  password: process.env.SQL_PASS,
  synchronize: process.env.SQL_SYNC,
};

export const appConfig = {
  port: process.env.APP_PORT,
  pathStorage: process.env.STORAGE,
  logoutAfterMinute: process.env.LOGOUT_AFTER_MINUTE,
};

export const bcryptConfig = {
  saltRound: process.env.BCRYPT_SALT_ROUNDS as unknown as number,
};

export const jwtConfig = {
  secret: process.env.JWT_SECRET_KEY,
  expiresIn: process.env.JWT_EXPIRES_IN,
};
