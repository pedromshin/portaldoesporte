import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateChampionshipDto } from './dto/create-championship.dto';
import { UpdateChampionshipDto } from './dto/update-championship.dto';
import { Model } from 'mongoose';
import { Championship } from '@entities/championship.entity';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class ChampionshipService {
  constructor(
    @InjectModel(Championship.name) private readonly model: Model<Championship>,
  ) {}

  async create(
    createChampionshipDto: CreateChampionshipDto,
  ): Promise<Championship> {
    try {
      return await this.model.create(createChampionshipDto);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async findAll(): Promise<Championship[]> {
    try {
      return await this.model.find().exec();
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async findOne(id: string): Promise<Championship> {
    try {
      return await this.model.findById(id).exec();
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async update(
    id: string,
    updateChampionshipDto: UpdateChampionshipDto,
  ): Promise<Championship> {
    try {
      const result = await this.model
        .findByIdAndUpdate(id, updateChampionshipDto, { new: true })
        .exec();
      if (!result) {
        throw new HttpException('Document not found', HttpStatus.NOT_FOUND);
      }
      return result;
    } catch (error) {
      throw new HttpException(
        { status: HttpStatus.BAD_REQUEST, error: 'Error updating document' },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async remove(id: string) {
    try {
      return await this.model.deleteOne({ _id: id }).exec();
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
