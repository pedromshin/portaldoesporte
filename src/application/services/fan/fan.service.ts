import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateFanDto } from './dto/create-fan.dto';
import { UpdateFanDto } from './dto/update-fan.dto';
import { Model } from 'mongoose';
import { Fan } from '@entities/fan.entity';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class FanService {
  constructor(@InjectModel(Fan.name) private readonly model: Model<Fan>) {}

  async create(createFanDto: CreateFanDto): Promise<Fan> {
    try {
      return await this.model.create(createFanDto);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async findAll(): Promise<Fan[]> {
    try {
      return await this.model.find().exec();
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async findOne(id: string): Promise<Fan> {
    try {
      return await this.model.findById(id).exec();
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async update(id: string, updateFanDto: UpdateFanDto): Promise<Fan> {
    try {
      const result = await this.model
        .findByIdAndUpdate(id, updateFanDto, { new: true })
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
