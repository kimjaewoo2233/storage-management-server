import { Injectable } from "@nestjs/common";
import { ClientProxy, ClientProxyFactory, Transport } from "@nestjs/microservices";
import { ConfigService } from "@nestjs/config";
import { lastValueFrom } from "rxjs";

@Injectable()
export class FileServiceProxy{
  private client: ClientProxy;

  constructor(
    private readonly configService: ConfigService
  ) {
    // TCP 통신 설정
    this.client = ClientProxyFactory.create({
      transport: Transport.TCP,
      options: {
        host: this.configService.get<string>("FILE_SERVICE_HOST"),
        port: this.configService.get<number>("FILE_SERVICE_PORT"),
      },
    });
  }

  async uploadFile(file: Express.Multer.File) {
    return lastValueFrom(
      this.client.send('file_upload', {
        filename: file.originalname,
        buffer: file.buffer,
        mimetype: file.mimetype,
      })
    );
  }
}