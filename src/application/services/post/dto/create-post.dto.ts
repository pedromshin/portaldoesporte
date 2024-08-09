import { IsMongoId, IsNotEmpty, IsString, IsIn } from 'class-validator';
import { Types } from 'mongoose';

export class CreatePostDto {
  @IsMongoId()
  _subscribableId: Types.ObjectId;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString({ each: true })
  @IsIn(['sport', 'athlete', 'gym'], { each: true })
  entity: 'sport' | 'athlete' | 'gym';
}
