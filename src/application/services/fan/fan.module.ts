import { Module } from '@nestjs/common';
import { FanService } from './fan.service';
import { FanController } from './fan.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Fan } from '@entities/fan.entity';
import { FanSchema } from '@schemas/fan.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Fan.name, schema: FanSchema }])],
  controllers: [FanController],
  providers: [FanService],
})
export class FanModule {}
