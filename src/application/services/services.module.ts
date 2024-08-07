import { Module } from '@nestjs/common';
import { ModalityModule } from './modality/modality.module';
import { AthleteModule } from './athlete/athlete.module';
import { PostModule } from './post/post.module';
import { ChampionshipModule } from './championship/championship.module';
import { FanModule } from './fan/fan.module';
import { GymModule } from './gym/gym.module';

@Module({
  imports: [
    ModalityModule,
    AthleteModule,
    PostModule,
    ChampionshipModule,
    FanModule,
    GymModule,
  ],
})
export class ServicesModule {}
