import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'dotenv/config';

async function bootstrap() {
  const port = process.env.PORT
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true, // Automatically transform input data to DTO instances
      whitelist: true
    }),
  );
  
  await app.listen(port,()=>{
    console.log(`=================================`);
    console.log(`=================================`);
    console.log(`🚀 App listening on the port :${port}`);
    console.log(`=================================`);
    console.log(`=================================`);
  });

}
bootstrap();
