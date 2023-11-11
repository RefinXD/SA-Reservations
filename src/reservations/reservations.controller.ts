import { Controller, Get, Param, Delete } from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { PlacesService } from 'src/places/places.service';

@Controller('reservations')
export class ReservationsController {
  constructor(
    private readonly reservationsService: ReservationsService,
    readonly placeService: PlacesService,
  ) {}
  @Get()
  findAll() {
    return this.reservationsService.findAll();
  }

  @Get(':name')
  findOne(@Param('name') name: string) {
    return this.reservationsService.findByOwner(name);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.reservationsService.remove(+id);
  }
}
