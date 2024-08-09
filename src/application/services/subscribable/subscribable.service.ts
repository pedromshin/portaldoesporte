import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateSubscribableDto } from './dto/create-subscribable.dto';
import { UpdateSubscribableDto } from './dto/update-subscribable.dto';
import { Model } from 'mongoose';
import { Subscribable } from '@entities/subscribable.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Sport } from '@entities/sport.entity';
import { Athlete } from '@entities/athlete.entity';
import { User } from '@entities/user.entity';
import { Post } from '@entities/post.entity';

@Injectable()
export class SubscribableService {
  constructor(
    @InjectModel(Subscribable.name)
    private readonly subscribableModel: Model<Subscribable>,
    @InjectModel(Sport.name) private readonly sportModel: Model<Sport>,
    @InjectModel(Athlete.name) private readonly athleteModel: Model<Athlete>,
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async create(
    createSubscribableDto: CreateSubscribableDto,
  ): Promise<[any, Subscribable]> {
    try {
      const subscribable = await this.subscribableModel.create(
        createSubscribableDto,
      );

      const { entity, name } = createSubscribableDto;

      const entityModels = {
        sport: this.sportModel,
        athlete: this.athleteModel,
      };

      const model = await entityModels[entity].create({
        _subscribableId: subscribable._id,
        name,
      });

      return [model, subscribable];
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async findAll(): Promise<Subscribable[]> {
    try {
      return await this.subscribableModel.find().exec();
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async findOne(id: string): Promise<Subscribable> {
    try {
      return await this.subscribableModel.findById(id).exec();
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async update(
    id: string,
    updateSubscribableDto: UpdateSubscribableDto,
  ): Promise<Subscribable> {
    try {
      const result = await this.subscribableModel
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
      return await this.subscribableModel.deleteOne({ _id: id }).exec();
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async clubs(id: string) {
    try {
      const user = await this.userModel.findById(id).exec();
      if (!user) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }

      const subscribables = await this.subscribableModel
        .find({ _id: { $in: user._subscribableIds } })
        .exec();

      return subscribables;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
