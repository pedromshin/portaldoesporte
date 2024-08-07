import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Post extends Document {
  @Prop()
  name: string;
}

export const PostSchema = SchemaFactory.createForClass(Post);
