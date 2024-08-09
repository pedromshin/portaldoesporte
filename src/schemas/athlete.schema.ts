import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type AthleteDocument = HydratedDocument<Athlete>;

@Schema()
export class Athlete {
  @Prop({ type: Types.ObjectId, ref: 'Subscribable', required: true })
  _subscribableId: Types.ObjectId;

  @Prop()
  name: string;
}

export const AthleteSchema = SchemaFactory.createForClass(Athlete);
