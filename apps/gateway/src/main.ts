import { NestFactory } from "@nestjs/core";
import { GatewayModule } from "./gateway.module";
import { MicroserviceOptions, Transport } from "@nestjs/microservices";

async function bootstrap() {
  const app = await NestFactory.create(GatewayModule);
  app.setGlobalPrefix('api');
  // File Service
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.TCP,
    options: { host: 'localhost', port: 5001 },
  });

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.TCP,
    options: { host: 'localhost', port: 5002}
  });

  await app.startAllMicroservices();
  await app.listen(5050);
}
bootstrap();
