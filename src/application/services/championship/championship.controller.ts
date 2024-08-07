import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ChampionshipService } from './championship.service';
import { CreateChampionshipDto } from './dto/create-championship.dto';
import { UpdateChampionshipDto } from './dto/update-championship.dto';

@Controller('championship')
export class ChampionshipController {
  constructor(private readonly championshipService: ChampionshipService) {}

  @Post()
  create(@Body() createChampionshipDto: CreateChampionshipDto) {
    return this.championshipService.create(createChampionshipDto);
  }

  @Get()
  findAll() {
    return this.championshipService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.championshipService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateChampionshipDto: UpdateChampionshipDto) {
    return this.championshipService.update(id, updateChampionshipDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.championshipService.remove(id);
  }
}
