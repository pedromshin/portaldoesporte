import { Module } from '@nestjs/common';
import { ModalityService } from './modality.service';
import { ModalityController } from './modality.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ModalitySchema } from '@schemas/modality.schema';
import { Modality } from '../../../entities/modality.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Modality.name, schema: ModalitySchema },
    ]),
  ],
  controllers: [ModalityController],
  providers: [ModalityService],
})
export class ModalityModule {}
