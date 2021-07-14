import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Jira API')
    .setDescription('Jira API description')
    .setVersion('1.0')
    .addTag('jira')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // app.useGlobalPipes(new ValidationPipe({
  //   transform: true
  // }));

  app.enableCors();

  await app.listen(8081);
}
bootstrap();
