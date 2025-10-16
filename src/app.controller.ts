import { Controller, Get, Logger, Query, Put, Body } from '@nestjs/common';
import { AppService } from './app.service';
import { GetForecastDto } from './dto/get-forecast.dto';

@Controller('weather')
export class AppController {
  private readonly logger = new Logger(AppController.name);
  constructor(private readonly appService: AppService) {}

  @Put('control/delay')
  setDelay(@Body('delay') delay: number): {
    message: string;
    newDelay: number;
  } {
    const newDelay = delay >= 0 ? delay : 0;
    this.logger.warn(
      `Dynamically setting weather service delay to ${newDelay}ms`,
    );
    return this.appService.setDelay(newDelay);
  }

  @Get('forecast')
  async getForecast(@Query() getForecastDto: GetForecastDto) {
    const { destination, date } = getForecastDto;
    this.logger.log(`Fetching weather for ${destination} on ${date}`);

    const delay = this.appService.getDelay();

    if (delay > 0) {
      this.logger.warn(`Simulating a dynamic delay of ${delay}ms.`);
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
    return this.appService.getForecastData(destination, date);
  }
}
