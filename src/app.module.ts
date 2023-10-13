import { FeaturesModule } from './modules/features.module';
import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { typeOrmConfig } from './configs/database/typeorm.config';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { DiscoveryModule } from '@golevelup/nestjs-discovery';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    ScheduleModule.forRoot(),
    MailerModule.forRoot({
      transport: {
        host: process.env.EMAIL_HOST,
        port: Number(process.env.EMAIL_POST),
        auth: {
          type: 'OAuth2',
          user: process.env.EMAIL_ID,
          // pass: process.env.EMAIL_PASS,
          clientId: process.env.EMAIL_CLIENT_ID,
          clientSecret: process.env.EMAIL_CLIENT_SECRET,
          refreshToken: process.env.EMAIL_REFRESH_TOKEN,
        },
        tls: {
          ciphers: 'SSLv3',
        },
      },
      defaults: {
        from: 'System <noreply@demo.com>',
      },
      template: {
        dir: 'templates',
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        },
      },
    }),
    AuthModule,
    FeaturesModule,
    DiscoveryModule,
  ],
})
export class AppModule {}
