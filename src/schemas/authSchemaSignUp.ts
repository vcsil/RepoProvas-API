import joi from 'joi';
import { TAuth } from '../types/authTypes';

const authSchemaSignUp = joi.object<TAuth>({
  email: joi.string().email().required(),
  password: joi.string().min(10).required(),
  confirmPassword: joi.ref('password'),
});

export default authSchemaSignUp;