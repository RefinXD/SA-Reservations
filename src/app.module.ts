import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReservationsModule } from './reservations/reservations.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Reservation } from './reservations/entities/reservation.entity';
import config from './config/config';
import { HttpModule } from '@nestjs/axios';
import { PlacesModule } from './places/places.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
    }),
    TypeOrmModule.forRootAsync({
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        port: configService.get<number>('database.port'),
        username: configService.get<string>('database.username'),
        password: configService.get<string>('database.password'),
        database: configService.get<string>('database.name'),
        host: configService.get<string>('database.host'),
        synchronize: true,
        entities: [Reservation],
        autoLoadEntities: true,
      }),
      inject: [ConfigService],
    }),
    ReservationsModule,
    PlacesModule,
    HttpModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
