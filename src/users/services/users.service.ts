import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { User, Role } from '../entities/user.entity';
import { CreateUserDto, UpdateUserDto } from '../dtos/user.dto';

@Injectable()
export class UsersService {
  constructor(
    private configService: ConfigService
  ) {}

  private counterId = 1;
  private users: User[] = [
    {
      id: 1,
      email: 'kayaba@gmail.com',
      password: 'helloworld',
      role: Role.ADMIN,
    },
  ];
  findAll() {
    const apiKey = this.configService.get('API_KEY')
    console.log(apiKey)
    return this.users;
  }

  findOne(id: number) {
    const user = this.users.find((item) => item.id === id )
    if(!user) {
      throw new NotFoundException(`User #${id} not found`)
    }
    return user
  }

  create(data: CreateUserDto) {
    this.counterId = this.counterId + 1
    const newUser = {
      id: this.counterId,
      ...data,
    }
    this.users.push(newUser);
    return newUser;
  }

  update(id: number, data: UpdateUserDto) {
    const user = this.findOne(id)
    const index = this.users.findIndex((item) => item.id === id)
    this.users[index] = {
      ...user,
      ...data
    }
    return this.users[index]
  }

  remove(id: number) {
    const index = this.users.findIndex((item) => item.id === id)
    if(index === -1) {
      throw new NotFoundException(`User #${id} not found`)
    }
    this.users.splice(index, 1)
    return true
  }
}
