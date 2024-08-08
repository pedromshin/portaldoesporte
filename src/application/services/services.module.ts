import { Module } from '@nestjs/common';
import { ModalityModule } from './modality/modality.module';
import { AthleteModule } from './athlete/athlete.module';
import { PostModule } from './post/post.module';
import { ChampionshipModule } from './championship/championship.module';
import { GymModule } from './gym/gym.module';
import { ClubModule } from './club/club.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { SubscribableModule } from './subscribable/subscribable.module';

@Module({
  imports: [
    ModalityModule,
    AthleteModule,
    PostModule,
    ChampionshipModule,
    GymModule,
    ClubModule,
    UserModule,
    AuthModule,
    SubscribableModule,
  ],
})
export class ServicesModule {}
