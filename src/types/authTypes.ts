import { User } from '@prisma/client';

export type TAuth = Omit<User, 'id'> & {
  confirmPassword: string 
};

export type TAuthBasic = Omit<User, 'id'>;

export type TAuthEmail = Pick<User, 'email'>;