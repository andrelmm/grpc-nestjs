import { NestFactory } from '@nestjs/core';
import { BolsaValoresModule } from './bolsa-valores.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { ValidationPipe } from '@nestjs/common';
import { ValidationExceptionFilter } from './orders/validation-exception.filter';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    BolsaValoresModule,
    {
      transport: Transport.GRPC,
      options: {
        package: 'orders',
        protoPath: [join(__dirname, 'orders', 'proto', 'orders.proto')],
        loader: { keepCase: true }
      },
    }
  );
  app.useGlobalFilters(new ValidationExceptionFilter());
  app.useGlobalPipes(new ValidationPipe());
  await app.listen();
}
bootstrap();
