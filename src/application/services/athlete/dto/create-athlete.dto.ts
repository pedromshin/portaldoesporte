import { IsString } from 'class-validator';

export class CreateAthleteDto {
  @IsString()
  name: string;
}
