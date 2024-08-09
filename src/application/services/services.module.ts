import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { SubscribableModule } from './subscribable/subscribable.module';
import { AthleteModule } from './athlete/athlete.module';
import { SportModule } from './sport/sport.module';
import { PostModule } from './post/post.module';

@Module({
  imports: [
    UserModule,
    AuthModule,
    SubscribableModule,
    AthleteModule,
    SportModule,
    PostModule,
  ],
})
export class ServicesModule {}
