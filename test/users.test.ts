import supertest from 'supertest';

import app from '../src/app';
import userFactory, { userSignUp } from './factories/userFactory';

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
    const user = await userSignUp();

    const result = await supertest(app).post('/signup').send(
      {
        email: user.email,
        password: user.password,
        confirmPassword: user.password,
      },
    );

    expect(result.status).toBe(400);
  });
});

describe('Testa SignIn', () => {
  it('Testa SignIn com o body correto -> deve retornar 200 e o token dentro de um objeto', async () => {
    const user = await userSignUp();
    
    const result = await supertest(app).post('/signin').send({ email: user.email, password: user.password });

    expect(result.status).toBe(200);
    expect(result.body).toBeInstanceOf(Object);
  });

  it('Testa SignIn com a senha incorreta -> deve retornar 401', async () => {
    const user = await userSignUp();

    const invalidCredentials = { email: user.email, password: user.password + 'a' };
    const result = await supertest(app).post('/signin').send(invalidCredentials);

    expect(result.status).toBe(401);
  });
});