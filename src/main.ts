import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors()

  app.setGlobalPrefix('/api/v1')

 

const PORT = (process.env.PORT || 3000);
await app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}
bootstrap();
