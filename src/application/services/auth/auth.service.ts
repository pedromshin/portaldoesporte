import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { User } from '@schemas/user.schema';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userModel.findOne({ username });
    if (user && (await bcrypt.compare(password, user.password))) {
      const { password, ...result } = user.toObject();
      return result;
    }
    return null;
  }

  async login(username: string, password: string) {
    try {
      const user = await this.validateUser(username, password);
      if (!user) {
        throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
      }
      const payload = { username: user.username, sub: user._id };
      return {
        access_token: this.jwtService.sign(payload),
      };
    } catch (error) {
      throw new HttpException('Login failed', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async register(username: string, password: string) {
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new this.userModel({
        username,
        password: hashedPassword,
      });
      await newUser.save();
      return this.login(username, password);
    } catch (error) {
      throw new HttpException(
        'Failed to register user',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
