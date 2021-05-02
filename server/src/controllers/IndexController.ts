import { Request, Response } from 'express';

export default class IndexController {
  ping(request: Request, response: Response) {
    response.json({
      status: 'OK',
      time: new Date().toLocaleTimeString('pt-BR'),
    });
  }
}