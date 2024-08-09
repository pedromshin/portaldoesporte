import { Module } from '@nestjs/common';
import { SportService } from './sport.service';
import { SportController } from './sport.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Sport } from '@entities/sport.entity';
import { SportSchema } from '@schemas/sport.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Sport.name, schema: SportSchema }]),
  ],
  controllers: [SportController],
  providers: [SportService],
})
export class SportModule {}
