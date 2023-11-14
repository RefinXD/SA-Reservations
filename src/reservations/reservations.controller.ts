import {
  Controller,
  Get,
  Param,
  Delete,
  ExecutionContext,
  UnauthorizedException,
  Req,
} from '@nestjs/common';
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

  @Get('reserver/:name')
  findOneByReserver(@Param('name') name: string) {
    return this.reservationsService.findByReserver(name);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Req() request: Request) {
    const authorizationHeader = request.headers['authorization'];
    const [bearer, token] = authorizationHeader.split(' ');
    if (bearer !== 'Bearer' || !token) {
      // Handle the case where the Authorization header is not in the expected format
      return 'Invalid Authorization header format';
    }
    return this.reservationsService.remove(+id, token);
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException();
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.get('authorization').split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
