import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type GymDocument = HydratedDocument<Gym>;

@Schema()
export class Gym {
  @Prop()
  name: string;
}

export const GymSchema = SchemaFactory.createForClass(Gym);
