import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type PostDocument = HydratedDocument<Post>;

@Schema()
export class Post {
  @Prop({ type: Types.ObjectId, ref: 'Subscribable', required: true })
  _subscribableId: Types.ObjectId;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  entity: string;
}

export const PostSchema = SchemaFactory.createForClass(Post);
