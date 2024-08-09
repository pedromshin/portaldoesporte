import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type SubscribableDocument = HydratedDocument<Subscribable>;

@Schema()
export class Subscribable {
  @Prop({ type: [{ type: Types.ObjectId, ref: 'Post' }] })
  _postIds: Types.ObjectId[];

  @Prop({ type: [{ type: Types.ObjectId, ref: 'User' }] })
  _userIds: Types.ObjectId[];

  @Prop()
  name: string;

  @Prop({ required: true })
  entity: string;
}

export const SubscribableSchema = SchemaFactory.createForClass(Subscribable);
