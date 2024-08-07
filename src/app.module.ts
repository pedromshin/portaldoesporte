import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { config } from 'dotenv';
import { ServicesModule } from './application/services/services.module';
import { AthleteModule } from './application/services/athlete/athlete.module';

config();
@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(String(process.env.MONGODB_URI)),
    ServicesModule,
    AthleteModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
