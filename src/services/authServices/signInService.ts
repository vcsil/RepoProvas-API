/* eslint-disable @typescript-eslint/no-throw-literal */
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
dotenv.config();

import { TAuthEmail, TAuthBasic } from '../../types/authTypes';
import * as userRepository from '../../repositories/userRepository';
import { User } from '@prisma/client';

async function findUserByEmail(emailObj: TAuthEmail): Promise<User> {
  const userData = await userRepository.findUserByEmail(emailObj);
  
  if (!userData) throw { code: 'Unauthorized', message: 'Incorrect password or email!' };
  
  return userData; 
}

async function validatePassword(frontPassword: string, dbPassword: string) {
  const passwordRight = bcrypt.compareSync(frontPassword, dbPassword);

  if (!passwordRight) throw { code: 'Unauthorized', message: 'Incorrect password or email!' };

  return passwordRight;
}

export async function signin(authObj: TAuthBasic): Promise<string> {
  const { email, password } = authObj;

  const userData = await findUserByEmail({ email });
  
  await validatePassword(password, userData.password);

  const secretKey: string = process.env.JWT_SECRET_KEY ?? '';
  const expireTime: string = process.env.JWT_EXPIRE_TIME ?? '1h';
  
  const token = jwt.sign({ userId: userData.id }, secretKey, { expiresIn: expireTime });

  return token;
}