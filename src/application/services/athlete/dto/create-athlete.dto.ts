import { IsString, IsArray, ArrayNotEmpty } from 'class-validator';

export class CreateAthleteDto {
  @IsString()
  name: string;
}
