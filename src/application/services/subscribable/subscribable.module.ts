import { Module } from '@nestjs/common';
import { SubscribableService } from './subscribable.service';
import { SubscribableController } from './subscribable.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { SubscribableSchema, Subscribable } from '@schemas/subscribable.schema';
import { Sport, SportSchema } from '@schemas/sport.schema';
import { Athlete, AthleteSchema } from '@schemas/athlete.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Subscribable.name, schema: SubscribableSchema },
      { name: Sport.name, schema: SportSchema },
      { name: Athlete.name, schema: AthleteSchema },
    ]),
  ],
  controllers: [SubscribableController],
  providers: [SubscribableService],
})
export class SubscribableModule {}
