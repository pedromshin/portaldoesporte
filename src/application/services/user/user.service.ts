import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Model } from 'mongoose';
import { User } from '@entities/user.entity';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private readonly model: Model<User>) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      return await this.model.create(createUserDto);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async findAll(): Promise<User[]> {
    try {
      return await this.model.find().exec();
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async findOne(id: string): Promise<User> {
    try {
      return await this.model.findById(id).exec();
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    try {
      const result = await this.model
        .findByIdAndUpdate(id, updateUserDto, { new: true })
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
