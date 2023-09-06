import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  constructor() {}

  getHello(): string {
    return 'Hello World!';
  }
  getAnotherThing(): string {
    return 'Hello another thing!';
  }
}
