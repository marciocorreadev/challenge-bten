import User from '@models/User';
import { DeleteResult, UpdateResult } from 'typeorm';

import UserRepository from '../repositories/UsersRepository';
import { getConnection } from 'typeorm';

class UserService {
  static async getUsers(skip: number, limit: number, keyword: string) {
    const usersRepository = getConnection(process.env.NODE_ENV).getCustomRepository(UserRepository)
    return await usersRepository.createQueryBuilder("user").take(limit).skip(skip)
      .where("user.height || user.homeTeam || user.name like '%' || :keyword || '%'", { keyword }).getManyAndCount();
  }

  static async getUser(userId: string) {
    const usersRepository = getConnection(process.env.NODE_ENV).getCustomRepository(UserRepository)
    return await usersRepository.findOne(userId) as User;
  }

  static async addUser(user: User) {
    const usersRepository = getConnection(process.env.NODE_ENV).getCustomRepository(UserRepository)
    const createUser: User = usersRepository.create(user)
    return await usersRepository.save(createUser);
  }

  static async updateUser(userId: string, user: User) {
    const usersRepository = getConnection(process.env.NODE_ENV).getCustomRepository(UserRepository)
    return await usersRepository.update(userId, user) as UpdateResult;
  }

  static async deleteUser(userId: string) {
    const usersRepository = getConnection(process.env.NODE_ENV).getCustomRepository(UserRepository)
    return await usersRepository.delete(userId) as DeleteResult;
  }
}

export default UserService;