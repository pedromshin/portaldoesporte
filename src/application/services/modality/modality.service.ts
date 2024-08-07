import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateModalityDto } from './dto/create-modality.dto';
import { UpdateModalityDto } from './dto/update-modality.dto';
import { Model } from 'mongoose';
import { Modality } from '../../../entities/modality.entity';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class ModalityService {
  constructor(
    @InjectModel(Modality.name) private readonly model: Model<Modality>,
  ) {}

  async create(createModalityDto: CreateModalityDto): Promise<Modality> {
    try {
      return await this.model.create(createModalityDto);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async findAll(): Promise<Modality[]> {
    try {
      return await this.model.find().exec();
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async findOne(_id: string): Promise<Modality> {
    try {
      return await this.model.findById(_id).exec();
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async update(
    _id: string,
    updateModalityDto: UpdateModalityDto,
  ): Promise<Modality> {
    try {
      const result = await this.model
        .findByIdAndUpdate(_id, updateModalityDto, {
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

  async remove(_id: string) {
    try {
      return await this.model.deleteOne({ _id }).exec();
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
