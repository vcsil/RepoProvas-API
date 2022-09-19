import joi from 'joi';
import { TAuth } from '../types/authTypes';

const authSchemaSignIn = joi.object<TAuth>({
  email: joi.string().email().required(),
  password: joi.string().min(10).required(),
});

export default authSchemaSignIn;