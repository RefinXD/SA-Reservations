import { Body, Controller, Patch } from '@nestjs/common';
import { UpdatePlace } from 'src/reservations/interface/place.interface';
import { PlacesService } from './places.service';
import { HttpService } from '@nestjs/axios';
import axios from 'axios';
@Controller('places')
export class PlacesController {
  constructor(
    private readonly placeService: PlacesService,
    private readonly httpService: HttpService,
  ) {}

  @Patch()
  async update(@Body() updatePlace: UpdatePlace): Promise<any> {
    try {
      const response = await axios.patch(
        'http://192.168.247.4:8080/update',
        updatePlace,
      );

      const data = response.data;

      console.log('returned data:');
      console.log(data);
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
