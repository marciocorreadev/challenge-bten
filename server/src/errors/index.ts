import { Request, Response } from 'express';
import AppError from './AppErro';

export default function ErrorMiddleware(error: Error, request: Request, response: Response) {
  if (error instanceof AppError) {
    const { message, statusCode } = error;
    return response.status(statusCode).json({ message });
  }
  return response.status(500).json({ status: 'Error', message: `Internal server error ${error.message}` });
}