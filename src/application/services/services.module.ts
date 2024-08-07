import { Module } from '@nestjs/common';
import { ModalityModule } from './modality/modality.module';

@Module({
  imports: [ModalityModule],
})
export class ServicesModule {}
