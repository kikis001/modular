import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Model } from 'mongoose';

import { User, Role } from '../entities/user.entity';
import { CreateUserDto, UpdateUserDto } from '../dtos/user.dto';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private productModel: Model<User>
  ) {}

  findAll() {
    return this.productModel.find().exec()
  }

  findOne(id: string) {
    const product = this.productModel.findById(id).exec();
    if (!product) {
      throw new NotFoundException(`Product #${id} not found`);
    }
    return product;
  }

  create(data: CreateUserDto) {
    const newProduct = new this.productModel(data)
    return newProduct.save();
  }

  update(id: string, changes: UpdateUserDto) {
    const product = this.productModel.findByIdAndUpdate(id, { $set: changes }, { new: true })
    if (!product) {
      throw new NotFoundException(`Product #${id} not found`);
    }
    return product;
  }

  remove(id: string) {
    return this.productModel.findByIdAndDelete(id)
  }
}
