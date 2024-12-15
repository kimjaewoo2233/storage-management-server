import { Controller, NestInterceptor, Post, UploadedFile, UseInterceptors } from "@nestjs/common";
import { FileServiceProxy } from "../../../../libs/proxies/file-service-proxy";
import { FileInterceptor } from "@nestjs/platform-express";


@Controller("document")
export class DocumentController{

  constructor(private readonly fileServiceProxy: FileServiceProxy) {
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file') as NestInterceptor)
  async uploadFile(@UploadedFile() file: Express.Multer.File) {

    try {
      const result = await this.fileServiceProxy.uploadFile(file);

      return {
        success: true,
        message: "File uploaded successfully",
        data: result,
      };
    } catch (error) {
      // 에러 핸들링: 명확한 에러 메시지 반환
      console.error("Error uploading file:", error.message);
      throw new BadRequestException('Failed to upload file. Please try again.');
    }
  }
}