import { Module } from '@nestjs/common';
import { ModalityModule } from './modality/modality.module';
import { AthleteModule } from './athlete/athlete.module';
import { PostModule } from './post/post.module';
import { PostModule } from './post/post.module';

@Module({
  imports: [ModalityModule, AthleteModule, PostModule],
})
export class ServicesModule {}
