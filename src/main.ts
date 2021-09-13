import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app/app.module';
import * as helmet from 'helmet';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { ConfigService } from './app/config/config.service';
const config = new ConfigService();

function initSwagger(app: INestApplication) {
  const options = new DocumentBuilder()
    .setTitle('Rent price API')
    .setDescription('The Rent price API description')
    .setVersion('1.0')
    .setBasePath(config.get('BASE_URL'))
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api/v1/docs', app, document);
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();
  app.use(helmet());
  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));

  if (process.env.SWAGGER_ON) initSwagger(app);

  await app.listen(config.get('PORT'));
}
bootstrap()
  .then(() => console.log('App started'))
  .catch((e) => console.error(e));
