import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';

@Injectable()
export class DemoPipe implements PipeTransform<string, number> {
  transform(value: any, metadata: ArgumentMetadata) {
    // code logic here
    return value;
  }
}
