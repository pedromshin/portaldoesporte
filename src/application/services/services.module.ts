import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { SubscribableModule } from './subscribable/subscribable.module';
import { ModalityModule } from './modality/modality.module';
import { AthleteModule } from './athlete/athlete.module';

@Module({
  imports: [
    UserModule,
    AuthModule,
    SubscribableModule,
    ModalityModule,
    AthleteModule,
  ],
})
export class ServicesModule {}
