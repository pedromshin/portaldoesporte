import { IsIn, IsString } from 'class-validator';

export class CreatePostDto {
  @IsString()
  _subscribableId: string;

  @IsString()
  name: string;

  @IsString({ each: true })
  @IsIn(['sport', 'athlete', 'gym'], { each: true })
  entity: 'sport' | 'athlete' | 'gym';
}
