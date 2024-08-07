import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ModalityService } from './modality.service';
import { CreateModalityDto } from './dto/create-modality.dto';
import { UpdateModalityDto } from './dto/update-modality.dto';

@Controller('modality')
export class ModalityController {
  constructor(private readonly modalityService: ModalityService) {}

  @Post()
  create(@Body() createModalityDto: CreateModalityDto) {
    return this.modalityService.create(createModalityDto);
  }

  @Get()
  findAll() {
    return this.modalityService.findAll();
  }

  @Get(':_id')
  findOne(@Param('_id') _id: string) {
    return this.modalityService.findOne(_id);
  }

  @Patch(':_id')
  update(
    @Param('_id') _id: string,
    @Body() updateModalityDto: UpdateModalityDto,
  ) {
    return this.modalityService.update(_id, updateModalityDto);
  }

  @Delete(':_id')
  remove(@Param('_id') _id: string) {
    return this.modalityService.remove(_id);
  }
}
