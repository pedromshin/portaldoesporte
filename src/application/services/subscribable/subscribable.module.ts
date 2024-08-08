import { Module } from '@nestjs/common';
import { SubscribableService } from './subscribable.service';
import { SubscribableController } from './subscribable.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { SubscribableSchema, Subscribable } from '@schemas/subscribable.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Subscribable.name, schema: SubscribableSchema },
    ]),
  ],
  controllers: [SubscribableController],
  providers: [SubscribableService],
})
export class SubscribableModule {}
