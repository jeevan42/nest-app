import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
  welcomeService(): string {
    return 'Welcome Buddy !!'
  }
  getHealth(): string {
    return 'Server is healthy'
  }

}
