import { User } from '@entities/user.entity';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from '@schemas/user.schema';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    JwtModule.register({
      secret: 'your_jwt_secret', // Use an environment variable in production
      signOptions: { expiresIn: '1h' },
    }),
  ],

  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
