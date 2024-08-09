import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { SubscribableService } from './subscribable.service';
import { CreateSubscribableDto } from './dto/create-subscribable.dto';
import { UpdateSubscribableDto } from './dto/update-subscribable.dto';

@Controller('subscribable')
export class SubscribableController {
  constructor(private readonly subscribableService: SubscribableService) {}

  @Post()
  create(@Body() createSubscribableDto: CreateSubscribableDto) {
    return this.subscribableService.create(createSubscribableDto);
  }

  @Get()
  findAll() {
    return this.subscribableService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.subscribableService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateSubscribableDto: UpdateSubscribableDto,
  ) {
    return this.subscribableService.update(id, updateSubscribableDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.subscribableService.remove(id);
  }

  @Get(':id/clubs')
  feed(@Param('id') id: string) {
    return this.subscribableService.clubs(id);
  }
}
