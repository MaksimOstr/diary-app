import { Controller, Get } from '@nestjs/common';


@Controller()
export class AppController {
  @Get('ping')
  ping(): { message: string } {
    return { message: 'Hello API' };
  }
}
