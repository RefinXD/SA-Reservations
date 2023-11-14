import { Injectable } from '@nestjs/common';
import {
  CreateReservationDto,
  CreateReservationDtoNoPayload,
} from './dto/create-reservation.dto';
import { Reservation } from './entities/reservation.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as amqp from 'amqplib';
import axios from 'axios';
@Injectable()
export class ReservationsService {
  constructor(
    @InjectRepository(Reservation)
    private readonly reservationRepository: Repository<Reservation>,
  ) {}
  async create(createReservationDto: CreateReservationDto, token: string) {
    const toBeSaved: CreateReservationDtoNoPayload = {
      owner: createReservationDto.owner,
      place: createReservationDto.place,
      date: createReservationDto.date,
      reserver: createReservationDto.reserver,
      numOfPeople: createReservationDto.numOfPeople,
    };
    // console.log('before');
    // console.log(createReservationDto.payload);
    createReservationDto.payload.NewInfo.AvailableSeat =
      createReservationDto.payload.NewInfo.AvailableSeat -
      createReservationDto.numOfPeople;
    // console.log('after');
    // console.log(createReservationDto.payload);
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    try {
      const response = await axios.patch(
        'http://localhost:8080/update',
        createReservationDto.payload,
        config,
      );

      const data = response.data;
      console.log(data);
      const reservation = await this.reservationRepository.create(toBeSaved);
      return await this.reservationRepository.save(reservation);
    } catch (error) {
      console.log(error);
    }
  }

  async findAll() {
    return await this.reservationRepository.find();
  }

  async findByOwner(ownerName: string) {
    return await this.reservationRepository.findOneBy({ owner: ownerName });
  }

  async findByReserver(reserver: string) {
    return await this.reservationRepository.findOneBy({ reserver: reserver });
  }

  async remove(reservationId: number, token: string) {
    try {
      const reservation = await this.reservationRepository.findOneBy({
        id: reservationId,
      });
      const response = await axios.get('http://localhost:8080/search', {
        params: {
          name: reservation.place,
        },
      });
      const data = response.data.place[0];
      const payload = {
        availableSeat: data.availableSeat + reservation.numOfPeople,
      };
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      // TargetName: string;
      // NewInfo: Place;
      const res = await axios.patch(
        'http://localhost:8080/update',
        { targetName: data.name, NewInfo: payload },
        config,
      );
      const resdata = res.data;
      console.log(resdata);
      return await this.reservationRepository.delete({ id: reservationId });
    } catch (error) {
      console.log(error);
    }
  }
}
@Injectable()
export class MessagingService {
  async handleMessage(message: any) {
    console.log(`Received message: ${JSON.stringify(message)}`);
  }
}

@Injectable()
export class MessagingHandler {
  private channel: amqp.Channel;

  constructor(
    private messagingService: MessagingService,
    private reservationService: ReservationsService,
  ) {
    this.connectToRabbitMQ();
  }

  async connectToRabbitMQ() {
    const connection = await amqp.connect('amqp://localhost:5672'); // Replace with your RabbitMQ connection URL
    this.channel = await connection.createChannel();
    const response = await axios.get('http://localhost:8080/search');
    console.log(response.data);
    response.data.place.forEach((place) => {
      console.log('created queue for', `${place.owner}`);
      const queueName = `${place.owner}`;
      this.channel.assertQueue(queueName, { durable: true });
      this.channel.consume(
        queueName,
        (message) => {
          // Handle messages for this place instance
          console.log(
            `Received message for Owner ${place.owner}: ${message.content.owner}`,
          );
          const obj = JSON.parse(message.content);
          this.reservationService.create(
            obj.body as CreateReservationDto,
            obj.token,
          );
        },
        { noAck: true },
      );
    });
  }
}
