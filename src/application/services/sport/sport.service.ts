import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateSportDto } from './dto/create-sport.dto';
import { UpdateSportDto } from './dto/update-sport.dto';
import { Model } from 'mongoose';
import { Sport } from '@entities/sport.entity';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class SportService {
  constructor(@InjectModel(Sport.name) private readonly model: Model<Sport>) {}

  async create(createSportDto: CreateSportDto): Promise<Sport> {
    try {
      return await this.model.create(createSportDto);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async findAll(): Promise<Sport[]> {
    try {
      return await this.model.find().exec();
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async findOne(id: string): Promise<Sport> {
    try {
      return await this.model.findById(id).exec();
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async update(id: string, updateSportDto: UpdateSportDto): Promise<Sport> {
    try {
      const result = await this.model
        .findByIdAndUpdate(id, updateSportDto, { new: true })
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
