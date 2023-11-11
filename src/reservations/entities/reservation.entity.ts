import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
@Entity({ name: 'reservations' })
export class Reservation {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  owner: string;
  @Column()
  place: string;
  @Column()
  date: Date;
  @Column()
  numOfPeople: number;
}
