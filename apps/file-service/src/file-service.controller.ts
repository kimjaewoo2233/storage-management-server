import { Controller, Get } from '@nestjs/common';
import { FileServiceService } from './file-service.service';
import { EventPattern, Payload } from "@nestjs/microservices";
import { Buffer } from 'buffer';

@Controller()
export class FileServiceController {
  constructor(private readonly fileServiceService: FileServiceService) {}

  @EventPattern("file_upload")
  async handleFileUpload(@Payload() data: { filename: string; buffer: Buffer; mimetype: string }){
    console.log(data.filename);

    return "경로보낼게";
  }
}
