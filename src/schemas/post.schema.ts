import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type PostDocument = HydratedDocument<Post>;

@Schema()
export class Post {
  @Prop({ type: { type: Types.ObjectId, ref: 'Subscribable' } })
  _subscribableId: Types.ObjectId;

  @Prop()
  name: string;

  @Prop({ required: true })
  entity: string;
}

export const PostSchema = SchemaFactory.createForClass(Post);
