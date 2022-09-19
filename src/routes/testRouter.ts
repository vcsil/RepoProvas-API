import { Router } from 'express';

import validateSchema from '../middlewares/schemaValidationMiddleware';
import { checkAuthMiddleware } from '../middlewares/authMiddleware';
import { testSchema } from '../schemas/testSchema';
import { createTest } from '../controllers/testController';

const testRouter = Router();

testRouter.post(
  '/test',
  checkAuthMiddleware,
  validateSchema(testSchema, 'body'),
  createTest,
);

export default testRouter;