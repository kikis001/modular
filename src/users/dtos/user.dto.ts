import { IsString, IsEmail, Length, IsNotEmpty, IsNumber} from 'class-validator'

import { PartialType } from '@nestjs/mapped-types'
import { Role, Status } from '../entities/user.entity';

export class CreateUserDto {
  @IsString()
  @IsEmail()
  readonly name: string;
  // readonly email: string;

  @IsString()
  @Length(6)
  readonly status: Status;

  @IsNumber()
  @IsNotEmpty()
  readonly year: number;


  @IsNotEmpty()
  readonly role: Role;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}


/*

{
  name: "Luis Enrique",
  year: 2022,
  grupo: 501,
  estado: en proceso,
}
*/
