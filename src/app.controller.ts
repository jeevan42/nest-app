import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/welcome')
  welcome(): string {
    return this.appService.welcomeService();
  }
  @Get('health')
  getHealth(): string {
    return this.appService.getHealth();
  }
}
