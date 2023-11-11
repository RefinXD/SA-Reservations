import { Module } from '@nestjs/common';
import { PlacesController } from './places.controller';
import { PlacesService } from './places.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  // // imports: [HttpModule, PlacesModule],
  imports: [HttpModule],
  controllers: [PlacesController],
  providers: [PlacesService],
})
export class PlacesModule {}
