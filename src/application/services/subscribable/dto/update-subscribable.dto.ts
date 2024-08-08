import { PartialType } from '@nestjs/mapped-types';
import { CreateSubscribableDto } from './create-subscribable.dto';

export class UpdateSubscribableDto extends PartialType(CreateSubscribableDto) {}
