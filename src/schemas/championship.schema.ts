import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ChampionshipDocument = HydratedDocument<Championship>;

@Schema()
export class Championship {
  @Prop()
  name: string;
}

export const ChampionshipSchema = SchemaFactory.createForClass(Championship);
