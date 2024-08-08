import { IsIn, IsString } from 'class-validator';

export class CreateSubscribableDto {
  @IsString()
  name: string;

  @IsString({ each: true })
  @IsIn(['modality', 'athlete', 'gym'], { each: true })
  entity: 'modality' | 'athlete' | 'gym';
}
