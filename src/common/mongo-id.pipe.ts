import { ArgumentMetadata, Injectable, PipeTransform, NotFoundException } from '@nestjs/common';
import { isMongoId } from 'class-validator'

@Injectable()
export class MongoIdPipe implements PipeTransform {
  transform(value: string, metadata: ArgumentMetadata) {
    if(!isMongoId(value)) {
      throw new NotFoundException(`${value} Not found`)
    }
    return value;
  }
}
