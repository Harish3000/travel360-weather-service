import { Logger } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Forecast } from './entity/forecast.entity';

const logger = new Logger('Seeder');

export async function seedWeather(forecastRepository: Repository<Forecast>) {
  const forecasts: Partial<Forecast>[] = [
    // 14 days of weather for BKK
    { destination: 'BKK', date: '2025-12-10', tempMin: 22, tempMax: 30, condition: 'Sunny' },
    { destination: 'BKK', date: '2025-12-11', tempMin: 23, tempMax: 31, condition: 'Sunny' },
    { destination: 'BKK', date: '2025-12-12', tempMin: 21, tempMax: 29, condition: 'Partly Cloudy' },
    { destination: 'BKK', date: '2025-12-13', tempMin: 22, tempMax: 28, condition: 'Showers' },
    { destination: 'BKK', date: '2025-12-14', tempMin: 23, tempMax: 30, condition: 'Partly Cloudy' },
    { destination: 'BKK', date: '2025-12-15', tempMin: 24, tempMax: 32, condition: 'Sunny' },
    { destination: 'BKK', date: '2025-12-16', tempMin: 24, tempMax: 32, condition: 'Sunny' },
    { destination: 'BKK', date: '2025-12-17', tempMin: 23, tempMax: 31, condition: 'Sunny' },
    { destination: 'BKK', date: '2025-12-18', tempMin: 22, tempMax: 30, condition: 'Partly Cloudy' },
    { destination: 'BKK', date: '2025-12-19', tempMin: 21, tempMax: 28, condition: 'Showers' },
    { destination: 'BKK', date: '2025-12-20', tempMin: 22, tempMax: 29, condition: 'Cloudy' },
    { destination: 'BKK', date: '2025-12-21', tempMin: 23, tempMax: 30, condition: 'Sunny' },
    { destination: 'BKK', date: '2025-12-22', tempMin: 24, tempMax: 31, condition: 'Sunny' },
    { destination: 'BKK', date: '2025-12-23', tempMin: 24, tempMax: 32, condition: 'Sunny' },

    // 14 days of weather for KTM
    { destination: 'KTM', date: '2025-12-10', tempMin: 5, tempMax: 15, condition: 'Clear' },
    { destination: 'KTM', date: '2025-12-11', tempMin: 6, tempMax: 16, condition: 'Clear' },
    { destination: 'KTM', date: '2025-12-12', tempMin: 4, tempMax: 14, condition: 'Hazy' },
    { destination: 'KTM', date: '2025-12-13', tempMin: 3, tempMax: 13, condition: 'Fog' },
    { destination: 'KTM', date: '2025-12-14', tempMin: 5, tempMax: 15, condition: 'Clear' },
    { destination: 'KTM', date: '2025-12-15', tempMin: 7, tempMax: 17, condition: 'Clear' },
    { destination: 'KTM', date: '2025-12-16', tempMin: 7, tempMax: 18, condition: 'Clear' },
    { destination: 'KTM', date: '2025-12-17', tempMin: 6, tempMax: 17, condition: 'Hazy' },
    { destination: 'KTM', date: '2025-12-18', tempMin: 5, tempMax: 16, condition: 'Clear' },
    { destination: 'KTM', date: '2025-12-19', tempMin: 4, tempMax: 14, condition: 'Fog' },
    { destination: 'KTM', date: '2025-12-20', tempMin: 5, tempMax: 15, condition: 'Clear' },
    { destination: 'KTM', date: '2025-12-21', tempMin: 6, tempMax: 16, condition: 'Clear' },
    { destination: 'KTM', date: '2025-12-22', tempMin: 7, tempMax: 17, condition: 'Clear' },
    { destination: 'KTM', date: '2025-12-23', tempMin: 8, tempMax: 18, condition: 'Clear' },
  ];
  for (const data of forecasts) {
    const forecast = forecastRepository.create(data as Partial<Forecast>);
    await forecastRepository.save(forecast);
  }
  logger.log('Weather data seeded.');
}