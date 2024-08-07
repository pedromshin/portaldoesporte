import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type MembershipDocument = HydratedDocument<Membership>;

@Schema()
export class Membership {
  @Prop()
  name: string;
}

export const MembershipSchema = SchemaFactory.createForClass(Membership);
