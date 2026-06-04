import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // swagger

  const config = new DocumentBuilder()
    .setTitle('Backend Api')
    .setDescription('Api rest')
    .setVersion('1.0')
    .addTag('backend')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, documentFactory);
  // endswagger

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
