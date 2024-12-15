import { Module } from '@nestjs/common';
import { GatewayController } from './gateway.controller';
import { GatewayService } from './gateway.service';
import { DocumentController } from "./controller/document.controller";

@Module({
  imports: [],
  controllers: [GatewayController, DocumentController],
  providers: [GatewayService],
})
export class GatewayModule {}
