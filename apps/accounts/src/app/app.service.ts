import { Get, Injectable } from '@nestjs/common';

@Injectable()
export class AppService {

  @Get('ping')
  getData(): { message: string } {
    return { message: 'Hello API' };
  }
}
