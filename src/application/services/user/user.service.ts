import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Model } from 'mongoose';
import { User } from '@entities/user.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Subscribable } from '@entities/subscribable.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    @InjectModel(Subscribable.name)
    private readonly subscribableModel: Model<Subscribable>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      return await this.userModel.create(createUserDto);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async findAll(): Promise<User[]> {
    try {
      return await this.userModel.find().exec();
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async findOne(id: string): Promise<User> {
    try {
      return await this.userModel.findById(id).exec();
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    try {
      const result = await this.userModel
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
      return await this.userModel.deleteOne({ _id: id }).exec();
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async subscribe(id: string, subscribableId: string) {
    try {
      const [updatedUser, updatedSubscribable] = await Promise.all([
        this.userModel
          .findByIdAndUpdate(
            id,
            { $push: { subscribableIds: subscribableId } },
            { new: true },
          )
          .exec(),
        this.subscribableModel
          .findByIdAndUpdate(
            subscribableId,
            { $push: { _userIds: id } },
            { new: true },
          )
          .exec(),
      ]);

      if (!updatedUser || !updatedSubscribable) {
        throw new HttpException('Document not found', HttpStatus.NOT_FOUND);
      }

      return [updatedUser, updatedSubscribable];
    } catch (error) {
      throw new HttpException(
        { status: HttpStatus.BAD_REQUEST, error: 'Error updating document' },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
