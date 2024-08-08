import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ModalityDocument = HydratedDocument<Modality>;

@Schema()
export class Modality {
  @Prop()
  name: string;
}

export const ModalitySchema = SchemaFactory.createForClass(Modality);
