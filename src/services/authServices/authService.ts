/* eslint-disable @typescript-eslint/no-throw-literal */
import * as userRepository from '../../repositories/userRepository';

export async function findUserById(id: number) {
  const user = await userRepository.findUserById(id);
  if (!user) throw { code: 'Not Found', message: 'User not found' };

  return user;
}