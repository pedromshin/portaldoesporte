import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { UpdateSubscriptionDto } from './dto/update-subscription.dto';
import { Model } from 'mongoose';
import { Subscription } from '@entities/subscription.entity';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class SubscriptionService {
  constructor(
    @InjectModel(Subscription.name) private readonly model: Model<Subscription>,
  ) {}

  async create(
    createSubscriptionDto: CreateSubscriptionDto,
  ): Promise<Subscription> {
    try {
      return await this.model.create(createSubscriptionDto);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async findAll(): Promise<Subscription[]> {
    try {
      return await this.model.find().exec();
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async findOne(id: string): Promise<Subscription> {
    try {
      return await this.model.findById(id).exec();
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async update(
    id: string,
    updateSubscriptionDto: UpdateSubscriptionDto,
  ): Promise<Subscription> {
    try {
      const result = await this.model
        .findByIdAndUpdate(id, updateSubscriptionDto, { new: true })
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
