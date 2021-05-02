import { Request, Response } from 'express';
import UserService from '@services/UserService';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import AppError from '@errors/AppErro';
import { loginValidate } from '@validators';
import User from '@models/User';

export default class AuthController {
  static async login({ body: { email, password } }: Request, response: Response) {
    try {
      await loginValidate({ email, password } as User);
    } catch (error) {
      throw new AppError(response, error.message, 400);
    }

    try {
      const user = await UserService.findOne(email);
      if (!user || !(await bcrypt.compare(password, user.password))) return response.status(404).json({ message: 'User does not exist' });

      const token = jwt.sign({ id: user.id }, process.env.APP_SECRET, { expiresIn: '1y' });

      return response.status(200).json({ token, id: user.id, email: user.email });
    } catch (error) {
      throw new AppError(response, error.message, 500);
    }
  }
}