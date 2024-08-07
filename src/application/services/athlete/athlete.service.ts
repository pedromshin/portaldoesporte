import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateAthleteDto } from './dto/create-athlete.dto';
import { UpdateAthleteDto } from './dto/update-athlete.dto';
import { Model } from 'mongoose';
import { Athlete } from '@entities/athlete.entity';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class AthleteService {
  constructor(
    @InjectModel(Athlete.name) private readonly model: Model<Athlete>,
  ) {}

  async create(createAthleteDto: CreateAthleteDto): Promise<Athlete> {
    try {
      return await this.model.create(createAthleteDto);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async findAll(): Promise<Athlete[]> {
    try {
      return await this.model.find().exec();
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async findOne(id: string): Promise<Athlete> {
    try {
      return await this.model.findById(id).exec();
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async update(
    id: string,
    updateAthleteDto: UpdateAthleteDto,
  ): Promise<Athlete> {
    try {
      const result = await this.model
        .findByIdAndUpdate(id, updateAthleteDto, {
          new: true,
        })
        .exec();
      if (!result) {
        throw new HttpException('Document not found', HttpStatus.NOT_FOUND);
      }
      return result;
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Error updating document',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async remove(id: string) {
    try {
      return await this.model.deleteOne({ id }).exec();
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
