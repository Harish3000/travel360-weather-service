import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Forecast } from './entity/forecast.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: ':memory:',
      entities: [Forecast],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Forecast]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
