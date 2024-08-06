import { IsString, IsArray, ArrayNotEmpty } from 'class-validator';

export class CreateModalityDto {
  @IsString()
  name: string;

  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  athletes: string[];
}
