import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Model, Types } from 'mongoose';
import { Post } from '@entities/post.entity';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '@entities/user.entity';
import { Subscribable } from '@entities/subscribable.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectModel(Post.name) private readonly postModel: Model<Post>,
    @InjectModel(User.name) private readonly userModel: Model<User>,
    @InjectModel(Subscribable.name)
    private readonly subscribableModel: Model<Subscribable>,
  ) {}

  async create(createPostDto: CreatePostDto): Promise<[Post, Subscribable]> {
    try {
      const subscribableId = Types.ObjectId.isValid(
        createPostDto._subscribableId,
      )
        ? new Types.ObjectId(createPostDto._subscribableId)
        : createPostDto._subscribableId;

      const post = await this.postModel.create({
        ...createPostDto,
        _subscribableId: subscribableId,
      });

      const subscribable = await this.subscribableModel.findByIdAndUpdate(
        createPostDto._subscribableId,
        { $addToSet: { _postIds: post._id } },
        { new: true },
      );

      return [post, subscribable];
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async findAll(): Promise<Post[]> {
    try {
      return await this.postModel.find().exec();
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async findOne(id: string): Promise<Post> {
    try {
      return await this.postModel.findById(id).exec();
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async update(id: string, updatePostDto: UpdatePostDto): Promise<Post> {
    try {
      const result = await this.postModel
        .findByIdAndUpdate(id, updatePostDto, { new: true })
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
      return await this.postModel.deleteOne({ _id: id }).exec();
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async feed(id: string) {
    try {
      const user = await this.userModel.findById(id).exec();
      if (!user) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }

      const subscribables = await this.subscribableModel
        .find({ _id: { $in: user._subscribableIds } })
        .exec();

      const postIds = subscribables.flatMap(
        (subscribable) => subscribable._postIds,
      );

      const posts = await this.postModel.find({ _id: { $in: postIds } }).exec();

      return posts;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
