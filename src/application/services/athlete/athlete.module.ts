import { Module } from '@nestjs/common';
import { AthleteService } from './athlete.service';
import { AthleteController } from './athlete.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Athlete } from '@entities/athlete.entity';
import { AthleteSchema } from '@schemas/athlete.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Athlete.name, schema: AthleteSchema }]),
  ],
  controllers: [AthleteController],
  providers: [AthleteService],
})
export class AthleteModule {}
