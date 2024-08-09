import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type SportDocument = HydratedDocument<Sport>;

@Schema()
export class Sport {
  @Prop({ type: Types.ObjectId, ref: 'Subscribable' })
  _subscribableId: Types.ObjectId;

  @Prop()
  name: string;
}

export const SportSchema = SchemaFactory.createForClass(Sport);
