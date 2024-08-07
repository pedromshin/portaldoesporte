import { Module } from '@nestjs/common';
import { ClubService } from './club.service';
import { ClubController } from './club.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Club } from '@entities/club.entity';
import { ClubSchema } from '@schemas/club.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Club.name, schema: ClubSchema }]),
  ],
  controllers: [ClubController],
  providers: [ClubService],
})
export class ClubModule {}
