import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { SubscribableModule } from './subscribable/subscribable.module';

@Module({
  imports: [UserModule, AuthModule, SubscribableModule],
})
export class ServicesModule {}
