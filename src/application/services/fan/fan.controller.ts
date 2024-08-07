import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { FanService } from './fan.service';
import { CreateFanDto } from './dto/create-fan.dto';
import { UpdateFanDto } from './dto/update-fan.dto';

@Controller('fan')
export class FanController {
  constructor(private readonly fanService: FanService) {}

  @Post()
  create(@Body() createFanDto: CreateFanDto) {
    return this.fanService.create(createFanDto);
  }

  @Get()
  findAll() {
    return this.fanService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.fanService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFanDto: UpdateFanDto) {
    return this.fanService.update(id, updateFanDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.fanService.remove(id);
  }
}
