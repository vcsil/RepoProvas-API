import { faker } from '@faker-js/faker';

import { TAuth } from '../../src/types/authTypes';

export default function userFactory(): TAuth {
  const password = faker.internet.password();
    
  const user: TAuth = {
    email: faker.internet.email(),
    password,
    confirmPassword: password,
  };

  return user;
}