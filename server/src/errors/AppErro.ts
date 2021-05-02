import { Response } from 'express';

export default class AppError {
    public readonly message: string;
    public readonly statusCode: number;

    constructor(resposne:Response, message: string, statusCode = 400) {
      this.message = message;
      this.statusCode = statusCode;

      resposne.status(this.statusCode).json({ error: this.message });
    }
}