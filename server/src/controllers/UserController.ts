import AppError from '@errors/AppErro';
import User from '@models/User';
import UserService from '@services/UserService';
import { userValidate } from '@validators';
import { Request, Response } from 'express';
import { DeleteResult, UpdateResult } from 'typeorm';

export default class UserController {

  async getUsers({ query: { limit = '10', skip = '0', keyword = '' } }: Request, response: Response) {
    try {
      const [data, total] = await UserService.getUsers(Number(skip), Number(limit), String(keyword));
      return response.status(200).json({ data, count: data.length, limit, skip, total });
    } catch (error) {
      throw new AppError(error.message, 500);
    }
  }

  async getUser({ params: { id } }: Request, response: Response) {
    try {
      if (!id) return response.status(400).json({ error: 'UserId is missing' });

      const user = <User>await UserService.getUser(id);
      if (!user) return response.status(404).json({ error: 'User not found' });

      return response.status(200).json(user);

    } catch (error) {
      throw new AppError(error.message, 500);
    }
  }

  async addUser({ body: user }: Request, response: Response) {
    try {
      await userValidate(user);
    } catch (error) {
      throw new AppError(error.message, 400);
    }

    try {
      const createUser = <User>await UserService.addUser(user);
      return response.status(201).json(createUser);
    } catch (error) {
      throw new AppError(error.message, 500);
    }
  }

  async updateUser({ body, params: { id } }: Request, response: Response) {
    try {
      if (!id) return response.status(400).json({ error: 'UserId is missing' });

      let user = <User>await UserService.getUser(id);
      if (!user) throw new Error("Student not exists!");

      user = { ...user, ...body, updatedAt: new Date() };
      await userValidate(user);

      const updateResult: UpdateResult = await UserService.updateUser(id, user);
      if (!updateResult.raw) return response.status(404).json({ error: 'User not found' });

      const updatedUser: User = await UserService.getUser(id);
      return response.status(200).json(updatedUser);

    } catch (error) {
      throw new AppError(error.message)
    }
  }

  async deleteUser({ params: { id } }: Request, resposne: Response) {
    try {
      if (!id) return resposne.status(400).json({ error: 'UserId is missing' });

      const deleteResult: DeleteResult = await UserService.deleteUser(id);
      return resposne.status(200).json(deleteResult);

    } catch (error) {
      throw new AppError(error.message, 500)
    }
  }
}