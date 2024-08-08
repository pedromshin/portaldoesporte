import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateSubscribableDto } from './dto/create-subscribable.dto';
import { UpdateSubscribableDto } from './dto/update-subscribable.dto';
import { Model } from 'mongoose';
import { Subscribable } from '@entities/subscribable.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Modality } from '@entities/modality.entity';
import { Athlete } from '@entities/athlete.entity';

@Injectable()
export class SubscribableService {
  constructor(
    @InjectModel(Subscribable.name)
    private readonly subscribableModel: Model<Subscribable>,
    @InjectModel(Modality.name) private readonly modalityModel: Model<Modality>,
    @InjectModel(Athlete.name) private readonly athleteModel: Model<Athlete>,
  ) {}

  async create(
    createSubscribableDto: CreateSubscribableDto,
  ): Promise<[any, Subscribable]> {
    try {
      const { entity, name } = createSubscribableDto;
      const entityModels = {
        modality: this.modalityModel,
        athlete: this.athleteModel,
      };

      const promises = [];

      if (entity in entityModels) {
        const model = entityModels[entity];
        promises.push(model.create({ name }));
      }

      promises.push(this.subscribableModel.create(createSubscribableDto));

      const [entityResponse, subscribable] = await Promise.all(promises);

      return [entityResponse, subscribable];
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
}
