import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type SubscribableDocument = HydratedDocument<Subscribable>;

@Schema()
export class Subscribable {
  @Prop()
  name: string;

  @Prop({ required: true })
  entity: string;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Post' }] })
  postIds: Types.ObjectId[];
}

export const SubscribableSchema = SchemaFactory.createForClass(Subscribable);
