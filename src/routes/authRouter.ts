import { Router } from 'express';

import { signIn, signUp } from '../controllers/authController';
import validateSchema from '../middlewares/schemaValidationMiddleware';
import authSchemaSignUp from '../schemas/authSchemaSignUp';
import authSchemaSignIn from '../schemas/authSchemaSignIn';

const authRouter = Router();

authRouter.post(
  '/signup',
  validateSchema(authSchemaSignUp, 'body'),
  signUp,
);

authRouter.post(
  '/signin',
  validateSchema(authSchemaSignIn, 'body'),
  signIn,
);

export default authRouter;