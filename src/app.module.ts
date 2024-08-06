import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { config } from 'dotenv';
import { ModalityModule } from './modality/modality.module';

config();
@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(String(process.env.MONGODB_URI)),
    ModalityModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
