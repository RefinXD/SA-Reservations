import { Controller, Inject } from '@nestjs/common';
import { ClientGrpc, GrpcMethod } from '@nestjs/microservices';
import { Place, UpdatePlace } from 'src/reservations/interface/place.interface';

interface PlaceService {
  updatePlace(updatePlace: UpdatePlace): Place;
}

@Controller('place')
export class PlacesController {
  private placeService: PlaceService;
  constructor(@Inject('places') private readonly client: ClientGrpc) {}

  onModuleInit() {
    this.placeService = this.client.getService<PlaceService>('places');
  }
  @GrpcMethod('places')
  async updatePlace(data: UpdatePlace): Promise<Place> {
    return await this.placeService.updatePlace(data);
  }
}
