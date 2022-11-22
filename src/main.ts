import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('WebHoo')
    .setDescription('Webhook system')
    .addServer('https://api-production-qggemmggya-uk.a.run.app', 'Procution')
    .addServer('http://localhost:3000', 'Local')
    .setVersion('1.0')
    .addTag('Login')
    .addTag('User')
    .addTag('Webhook')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
