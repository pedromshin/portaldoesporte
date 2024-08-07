import { Module } from '@nestjs/common';
import { ModalityModule } from './modality/modality.module';
import { AthleteModule } from './athlete/athlete.module';

@Module({
  imports: [ModalityModule, AthleteModule],
})
export class ServicesModule {}
