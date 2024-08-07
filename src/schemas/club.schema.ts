import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ClubDocument = HydratedDocument<Club>;

@Schema()
export class Club {
  @Prop()
  name: string;
}

export const ClubSchema = SchemaFactory.createForClass(Club);
