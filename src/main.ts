import { HttpAdapterHost, NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import 'reflect-metadata';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { appConfig } from './configs/configs.constants';
import { CommonLogger } from './common/logger/common-logger';
import { HttpExceptionFilter } from './common/filter/http-exception.filter';
import {
  LoggingInterceptor,
  TransformInterceptor,
} from './common/interceptors/transform.interceptor';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
  const logger = new CommonLogger('Main');
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  const options = new DocumentBuilder()
    .setTitle('Demo')
    .setDescription('The Demo API description')
    .setVersion('1.0')
    .addBearerAuth({
      type: 'http',
      in: 'header',
      scheme: 'bearer',
      bearerFormat: 'JWT',
    })
    .build();

  const document = SwaggerModule.createDocument(app, options);
  const pathSwagger = 'api';
  SwaggerModule.setup(pathSwagger, app, document);

  // Use custom exception filter.
  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new HttpExceptionFilter(httpAdapter));

  // Use class serializer.
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  app.useGlobalInterceptors(new TransformInterceptor());
  app.useGlobalInterceptors(new LoggingInterceptor()); // use for dev - dont use in prod

  // Use global validation pipe.
  app.useGlobalPipes(new ValidationPipe());

  // Use public static assets.
  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.useStaticAssets(join(__dirname, '..', 'templates'));

  // CORS.
  app.enableCors();

  // Upload file bigger
  // app.use(bodyParser.json({ limit: '20mb' }));
  // app.use(bodyParser.urlencoded({ limit: '20mb', extended: true }));

  // Use version
  // app.enableVersioning({
  //   type: VersioningType.URI,
  // });

  const port = appConfig.port;
  await app.listen(port);
  logger.log(`App is listening on port ${port}`);
  logger.log(`=> http://localhost:${port}/${pathSwagger}/`);
}
bootstrap();
