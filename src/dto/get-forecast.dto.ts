import { IsString, IsNotEmpty, IsDateString } from 'class-validator';

export class GetForecastDto {
  @IsString()
  @IsNotEmpty()
  destination: string;

  @IsDateString()
  @IsNotEmpty()
  date: string;
}
