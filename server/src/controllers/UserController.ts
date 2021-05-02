import AppError from '@errors/AppErro';
import User from '@models/User';
import UserService from '@services/UserService';
import { userValidate } from '@validators';
import { Request, Response } from 'express';
import { DeleteResult, UpdateResult } from 'typeorm';
import * as jwt from 'jsonwebtoken';

export default class UserController {
  static async getUsers({ query: { limit = '10', skip = '0', keyword = '' } }: Request, response: Response) {
    try {
      const [data, total] = await UserService.getUsers(Number(skip), Number(limit), String(keyword));
      return response.status(200).json({
        data, count: data.length, limit, skip, total,
      });
    } catch (error) {
      throw new AppError(response, error.message, 500);
    }
  }

  static async getUser({ params: { id } }: Request, response: Response) {
    try {
      if (!id) return response.status(400).json({ error: 'UserId is missing' });

      const user = <User> await UserService.getUser(id);
      if (!user) return response.status(404).json({ error: 'User not found' });

      return response.status(200).json(user);
    } catch (error) {
      throw new AppError(response, error.message, 500);
    }
  }

  static async addUser({ body: user }: Request, response: Response) {
    try {
      await userValidate(user);
    } catch (error) {
      throw new AppError(response, error.message, 400);
    }

    try {
      const studentAlreadyExists = await UserService.findOne(user.email);
      if (studentAlreadyExists) return response.status(400).json({ message: 'Student alteady exists!', email: user.email });

      const createUser = <User> await UserService.addUser(user);
      const token = jwt.sign({ id: user.id }, process.env.APP_SECRET, { expiresIn: '1y' });

      return response.status(201).json({ ...createUser, token });
    } catch (error) {
      throw new AppError(response, error.message, 500);
    }
  }

  static async updateUser({ body, params: { id } }: Request, response: Response) {
    try {
      if (!id) return response.status(400).json({ error: 'UserId is missing' });

      let user = <User> await UserService.getUser(id);
      if (!user) throw new Error('Student not exists!');

      user = { ...user, ...body, updatedAt: new Date() };
      await userValidate(user);

      const updateResult: UpdateResult = await UserService.updateUser(id, user);
      if (!updateResult.raw) return response.status(404).json({ error: 'User not found' });

      const updatedUser: User = await UserService.getUser(id);
      return response.status(200).json(updatedUser);
    } catch (error) {
      throw new AppError(response, error.message);
    }
  }

  static async deleteUser({ params: { id } }: Request, response: Response) {
    try {
      if (!id) return response.status(400).json({ error: 'UserId is missing' });

      const deleteResult: DeleteResult = await UserService.deleteUser(id);
      return response.status(200).json(deleteResult);
    } catch (error) {
      throw new AppError(response, error.message, 500);
    }
  }
}