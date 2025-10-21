import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Forecast {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  destination: string;

  @Column()
  date: string;

  @Column()
  tempMin: number;

  @Column()
  tempMax: number;

  @Column()
  condition: string;
}