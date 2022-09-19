import { TAuthEmail, TAuthBasic } from '../types/authTypes';
import { prisma } from '../database/database';
import { User } from '@prisma/client';

export async function findUserByEmail(emailObj: TAuthEmail): Promise<User | null> {
  const { email } = emailObj;
  
  const userData = await prisma.user.findUnique({
    where: { email },
  });

  return userData;
}

export async function insertUser(userData: TAuthBasic) {
  return prisma.user.create({ data: userData });
}

export async function findUserById(id: number) {
  return prisma.user.findUnique({
    where: { id },
  });
}