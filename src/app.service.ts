import { Injectable, Res } from '@nestjs/common';
import { Response } from 'express';

@Injectable()
export class AppService {
  getHello(@Res() response: Response) {
    return response.json({ message: 'Aninotes API' });
  }
}
