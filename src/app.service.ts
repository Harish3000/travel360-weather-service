import { Injectable, InternalServerErrorException, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { seedWeather } from './seeder';
import { Forecast } from './entity/forecast.entity';

@Injectable()
export class AppService implements OnModuleInit {
  private currentDelayMs: number = 0;

  constructor(
    @InjectRepository(Forecast)
    private readonly forecastRepository: Repository<Forecast>,
    private readonly configService: ConfigService,
  ) {
    this.currentDelayMs = this.configService.get<number>('WEATHER_DELAY_MS') || 0;
  }

  async onModuleInit() {
    await seedWeather(this.forecastRepository);
  }

  public setDelay(delay: number): { message: string; newDelay: number } {
    this.currentDelayMs = delay;
    return { message: 'Delay updated successfully.', newDelay: this.currentDelayMs };
  }

  public getDelay(): number {
    return this.currentDelayMs;
  }

  async getForecastData(destination: string, date: string) {
    const failRate = this.configService.get<number>('WEATHER_FAIL_RATE') || 0;
    if (Math.random() < failRate) {
      throw new InternalServerErrorException('Failed to fetch weather data.');
    }

    // 7-day range
    const startDate = new Date(date);
    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + 6);

    // format date
    const toDateString = (d: Date) => d.toISOString().split('T')[0];
    
    const forecasts = await this.forecastRepository.find({
      where: {
        destination: destination,
        date: Between(toDateString(startDate), toDateString(endDate)),
      },
      order: {
        date: 'ASC',
      }
    });
    return { forecast: forecasts };
  }
}