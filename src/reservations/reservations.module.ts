import { Module } from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { ReservationsController } from './reservations.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reservation } from './entities/reservation.entity';
// import { ClientsModule } from '@nestjs/microservices';
// import { grpcClientOptions } from 'src/grpc-client-options';
//import { PlacesController } from 'src/places/places.controller';

@Module({
  imports: [
    // ClientsModule.register([
    //   {
    //     name: 'PLACE_PACKAGE',
    //     ...grpcClientOptions,
    //   },
    // ]),
    TypeOrmModule.forFeature([Reservation]),
  ],
  controllers: [ReservationsController],
  providers: [ReservationsService],
})
export class ReservationsModule {}
