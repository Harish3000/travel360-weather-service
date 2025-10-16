import { Logger } from '@nestjs/common';
import { Repository } from 'typeorm';

const logger = new Logger('Seeder');

export async function seedWeather(forecastRepository: Repository<any>) {
  const forecasts = [
    {
      destination: 'BKK',
      startDate: '2025-12-10',
      endDate: '2025-12-16',
      tempMin: 22,
      tempMax: 30,
      condition: 'Sunny',
    },
    {
      destination: 'KTM',
      startDate: '2025-12-10',
      endDate: '2025-12-16',
      tempMin: 5,
      tempMax: 15,
      condition: 'Clear',
    },
  ];
  for (const data of forecasts)
    await forecastRepository.save(forecastRepository.create(data));
  logger.log('Weather data seeded.');
}
