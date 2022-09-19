import { Router } from 'express';

import validateSchema from '../middlewares/schemaValidationMiddleware';
import { checkAuthMiddleware } from '../middlewares/authMiddleware';
import { testSchema } from '../schemas/testSchema';
import { createTest, getTestsByDiscipline } from '../controllers/testController';

const testRouter = Router();

testRouter.post(
  '/test',
  checkAuthMiddleware,
  validateSchema(testSchema, 'body'),
  createTest,
);

testRouter.get(
  '/tests/disciplines',
  checkAuthMiddleware,
  getTestsByDiscipline,
);

export default testRouter;