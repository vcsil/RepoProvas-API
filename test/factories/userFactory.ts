import { faker } from '@faker-js/faker';
import supertest from 'supertest';
import bcrypt from 'bcrypt';
import { prisma } from '../../src/database/database';


import app from '../../src/app';
import { TAuth } from '../../src/types/authTypes';
import { TAuthBasic } from '../../src/types/authTypes';

export default function userFactory(): TAuth {
  const password = faker.internet.password();
    
  const user: TAuth = {
    email: faker.internet.email(),
    password,
    confirmPassword: password,
  };

  return user;
}

export async function userSignUp(): Promise<TAuthBasic> {
  const user = userFactory();
  const userDB: TAuthBasic = { email: user.email, password: bcrypt.hashSync(user.password, 10) };
        
  await prisma.user.create({
    data: userDB,
  });

  return { email: user.email, password: user.password };
}

export async function createToken() {
  const user = await userSignUp();

  const signInResult = await supertest(app).post('/signin').send(user);

  const { token } = signInResult.body;
  
  return token;
}