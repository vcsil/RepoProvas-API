import supertest from 'supertest';
import bcrypt from 'bcrypt';

import app from '../src/app';
import { prisma } from '../src/database/database';
import { TAuthBasic } from '../src/types/authTypes';
import userFactory from './factories/userFactory';

describe('Testa SignUp', () => {
  it('Testa SignUp com body correto -> deve retornar 201 e o usuário criado.', async () => {
    const user = userFactory();

    const result = await supertest(app).post('/signup').send(user);

    expect(result.status).toBe(201);
    expect(result.body).toBeInstanceOf(Object);
  });

  it('Testa SignUp com body incompleto -> deve retornar 422', async () => {
    const user = userFactory();
    user.email = '';
    
    const result = await supertest(app).post('/signup').send(user);

    expect(result.status).toBe(422);
  });

  it('Testa SignUp com confirmPassword incorreta -> deve retornar 422', async () => {
    const user = userFactory();
    user.confirmPassword = user.confirmPassword + 'a';
    
    const result = await supertest(app).post('/signup').send(user);

    expect(result.status).toBe(422);
  });

  it('Testa SignUp com email já em uso ->, deve retornar 400', async () => {
    const user = userFactory();
    const userDB: TAuthBasic = { email: user.email, password: user.password };
    
    await prisma.user.create({
      data: userDB,
    });

    const result = await supertest(app).post('/signup').send(user);

    expect(result.status).toBe(400);
  });
});

describe('Testa SignIn', () => {
  it('Testa SignIn com o body correto -> deve retornar 200 e o token dentro de um objeto', async () => {
    const user = userFactory();
    const { email, password } = user;
    const userDB: TAuthBasic = { email, password: bcrypt.hashSync(password, 10) };

    await prisma.user.create({
      data: userDB,
    });

    const result = await supertest(app).post('/signin').send({ email, password });

    console.log(result);

    expect(result.status).toBe(200);
    expect(result.body).toBeInstanceOf(Object);
  });

  it('Testa SignIn com a senha incorreta -> deve retornar 401', async () => {
    const user = userFactory();
    const { email, password } = user;
    const userDB: TAuthBasic = { email, password };

    await prisma.user.create({
      data: userDB,
    });

    const invalidCredentials = { email, password: password + 'a' };
    const result = await supertest(app).post('/signin').send(invalidCredentials);

    expect(result.status).toBe(401);
  });
});