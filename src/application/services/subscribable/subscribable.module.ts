import { Module } from '@nestjs/common';
import { SubscribableService } from './subscribable.service';
import { SubscribableController } from './subscribable.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { SubscribableSchema, Subscribable } from '@schemas/subscribable.schema';
import { Sport, SportSchema } from '@schemas/sport.schema';
import { Athlete, AthleteSchema } from '@schemas/athlete.schema';
import { Post, PostSchema } from '@schemas/post.schema';
import { User, UserSchema } from '@schemas/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Subscribable.name, schema: SubscribableSchema },
      { name: Sport.name, schema: SportSchema },
      { name: Athlete.name, schema: AthleteSchema },
      { name: Post.name, schema: PostSchema },
      { name: User.name, schema: UserSchema },
    ]),
  ],
  controllers: [SubscribableController],
  providers: [SubscribableService],
})
export class SubscribableModule {}
