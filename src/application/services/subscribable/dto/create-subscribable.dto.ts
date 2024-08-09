import { IsIn, IsString } from 'class-validator';

export class CreateSubscribableDto {
  @IsString()
  name: string;

  @IsString({ each: true })
  @IsIn(['sport', 'athlete', 'gym'], { each: true })
  entity: 'sport' | 'athlete' | 'gym';
}
