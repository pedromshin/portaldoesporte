import { IsMongoId, IsNotEmpty, IsString, IsIn } from 'class-validator';

export class CreatePostDto {
  @IsMongoId()
  _subscribableId: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString({ each: true })
  @IsIn(['sport', 'athlete', 'gym'], { each: true })
  entity: 'sport' | 'athlete' | 'gym';
}
