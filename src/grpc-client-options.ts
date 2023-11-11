import { ClientOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
export const grpcClientOptions: ClientOptions = {
  transport: Transport.GRPC,
  options: {
    package: 'places',
    protoPath: join(__dirname, './places/service.proto'),
  },
};
