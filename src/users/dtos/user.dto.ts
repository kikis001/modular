import { IsString, IsEmail, Length, IsNotEmpty} from 'class-validator'

import { PartialType } from '@nestjs/mapped-types'
import { Role } from '../entities/user.entity';

export class CreateUserDto {
  @IsString()
  @IsEmail()
  readonly email: string;

  @IsString()
  @Length(6)
  readonly password: string;

  @IsNotEmpty()
  readonly role: Role;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}
