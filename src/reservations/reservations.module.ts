import { Module } from '@nestjs/common';
import {
  MessagingHandler,
  MessagingService,
  ReservationsService,
} from './reservations.service';
import { ReservationsController } from './reservations.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reservation } from './entities/reservation.entity';
import { PlacesModule } from 'src/places/places.module';
import { PlacesService } from 'src/places/places.service';

@Module({
  imports: [TypeOrmModule.forFeature([Reservation]), PlacesModule],
  controllers: [ReservationsController],
  providers: [
    ReservationsService,
    PlacesService,
    MessagingService,
    MessagingHandler,
  ],
  exports: [MessagingService],
})
export class ReservationsModule {}
