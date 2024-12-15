import { Global, Module } from "@nestjs/common";
import { FileServiceProxy } from "./file-service-proxy";


@Global()
@Module({
  providers:[FileServiceProxy],
  exports:[FileServiceProxy]
})
export class ProxyModule{}