import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type AthleteDocument = HydratedDocument<Athlete>;

@Schema()
export class Athlete {
  @Prop()
  name: string;
}

export const AthleteSchema = SchemaFactory.createForClass(Athlete);
