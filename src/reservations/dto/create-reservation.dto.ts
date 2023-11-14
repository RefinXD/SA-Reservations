import { Place } from 'src/places/entities/place.entity';
import { UpdatePlace } from '../interface/place.interface';

export class CreateReservationDto {
  owner: string;
  place: string;
  reserver: string;
  date: Date;
  numOfPeople: number;
  payload: PayloadDto;
}

export class PayloadDto {
  TargetName: string;
  NewInfo: Place;
}
export class CreateReservationDtoNoPayload {
  owner: string;
  place: string;
  reserver: string;
  date: Date;
  numOfPeople: number;
}
