import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateSubscribableDto } from './dto/create-subscribable.dto';
import { UpdateSubscribableDto } from './dto/update-subscribable.dto';
import { Model } from 'mongoose';
import { Subscribable } from '@entities/subscribable.entity';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class SubscribableService {
  constructor(
    @InjectModel(Subscribable.name) private readonly model: Model<Subscribable>,
  ) {}

  async create(
    createSubscribableDto: CreateSubscribableDto,
  ): Promise<Subscribable> {
    try {
      return await this.model.create(createSubscribableDto);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async findAll(): Promise<Subscribable[]> {
    try {
      return await this.model.find().exec();
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async findOne(id: string): Promise<Subscribable> {
    try {
      return await this.model.findById(id).exec();
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async update(
    id: string,
    updateSubscribableDto: UpdateSubscribableDto,
  ): Promise<Subscribable> {
    try {
      const result = await this.model
        .findByIdAndUpdate(id, updateSubscribableDto, { new: true })
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
