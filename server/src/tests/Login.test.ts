import app from '@app';
import createConnection from '@database';
import request from 'supertest';
import { Connection } from 'typeorm';
import User from '../models/User';

const user = {
  homeTeam: 'Teste',
  email: 'a@a.com',
  password: '123456',
  name: 'Márcio',
  height: 85,
  age: new Date(),
} as User;

describe('Login', () => {
  let userCreated: User;
  let connection: Connection;
  let token: String;

  beforeAll(async () => {
    connection = await createConnection();
  });
  afterAll(async () => await connection.close());

  it('Should be able to create a new user', async () => {
    const response = await request(app).post('/user').send(user);
    expect(response.status).toBe(201);
    userCreated = response.body;
    token = response.body.token;
    expect(userCreated.name).toBe(user.name);
    expect(userCreated.email).toBe(user.email);
    expect(userCreated.homeTeam).toBe(user.homeTeam);
    expect(userCreated.height).toBe(user.height);
  });

  it('Should be able to login', async () => {
    const response = await request(app).post('/auth').send(user);
    expect(response.status).toBe(200);
    expect(!!response.body.token.length).toBe(true);
  });

  it('Should be able to  validate required password', async () => {
    const response = await request(app).post('/auth').send({ email: user.email });
    expect(response.body.error).toBe('password is a required field');
  });

  it('Should be able to  validate required email', async () => {
    const response = await request(app).post('/auth').send({ password: user.password });
    expect(response.body.error).toBe('email is a required field');
  });

  it('Should be able to remove a user', async () => {
    const response = await request(app).delete(`/user/${userCreated.id}`).set('authorization', `Barear ${token}`);
    expect(response.status).toBe(200);
    expect(response.body.affected).toBe(1);
  });
});