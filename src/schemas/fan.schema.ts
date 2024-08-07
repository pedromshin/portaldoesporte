import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type FanDocument = HydratedDocument<Fan>;

@Schema()
export class Fan {
  @Prop()
  name: string;
}

export const FanSchema = SchemaFactory.createForClass(Fan);
