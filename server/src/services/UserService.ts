import User from '@models/User';
import * as bcrypt from 'bcrypt';
import { DeleteResult, getConnection, UpdateResult } from 'typeorm';

import UserRepository from '../repositories/UsersRepository';

class UserService {
  static async getUsers(skip: number, limit: number, keyword: string) {
    const usersRepository = getConnection(process.env.NODE_ENV).getCustomRepository(UserRepository);
    return await usersRepository.createQueryBuilder('user').take(limit).skip(skip)
      .where("user.email || user.height || user.homeTeam || user.name like '%' || :keyword || '%'", { keyword })
      .getManyAndCount() as [User[], number];
  }

  static async getUser(userId: string) {
    const usersRepository = getConnection(process.env.NODE_ENV).getCustomRepository(UserRepository);
    return await usersRepository.findOne(userId) as User;
  }

  static async findOne(email: string) {
    const usersRepository = getConnection(process.env.NODE_ENV).getCustomRepository(UserRepository);
    return await usersRepository.findOne({ email }) as User;
  }

  static async addUser(user: User) {
    const usersRepository = getConnection(process.env.NODE_ENV).getCustomRepository(UserRepository);
    const password: string = await bcrypt.hash(user.password, 10);
    const createUser: User = usersRepository.create({ ...user, password });
    return await usersRepository.save(createUser) as User;
  }

  static async updateUser(userId: string, user: User) {
    const usersRepository = getConnection(process.env.NODE_ENV).getCustomRepository(UserRepository);
    return await usersRepository.update(userId, user) as UpdateResult;
  }

  static async deleteUser(userId: string) {
    const usersRepository = getConnection(process.env.NODE_ENV).getCustomRepository(UserRepository);
    return await usersRepository.delete(userId) as DeleteResult;
  }
}

export default UserService;