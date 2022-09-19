import joi from 'joi';
import { TAuthBasic, TAuth } from '../types/authTypes';

export const authSchemaSignIn = joi.object<TAuthBasic>({
  email: joi.string().email().required(),
  password: joi.string().min(10).required(),
});

export const authSchemaSignUp = joi.object<TAuth>({
  email: joi.string().email().required(),
  password: joi.string().min(10).required(),
  confirmPassword: joi.ref('password'),
});