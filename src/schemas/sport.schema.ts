import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type SportDocument = HydratedDocument<Sport>;

@Schema()
export class Sport {
  @Prop()
  name: string;
}

export const SportSchema = SchemaFactory.createForClass(Sport);
