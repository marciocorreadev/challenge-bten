import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';

export default async function auth({ headers: { authorization } }: Request, response: Response, next: NextFunction) {
  if (!authorization) return response.status(401).json({ message: 'Token is required!' });
  try {
    const [, token] : string[] = authorization.split(' ');
    await jwt.verify(token, process.env.APP_SECRET);
    next();
  } catch (error) {
    return response.status(401).json({ message: 'Invalid Token!' });
  }
}