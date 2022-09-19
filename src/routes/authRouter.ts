import { Router } from 'express';

import { signIn, signUp } from '../controllers/authController';
import validateSchema from '../middlewares/schemaValidationMiddleware';
import { authSchemaSignIn, authSchemaSignUp } from '../schemas/authSchema';

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