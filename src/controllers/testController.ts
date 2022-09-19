import { Request, Response } from 'express';

import { TTestUserPost } from '../types/testTypes';
import * as createTestService from '../services/testService/createTestService';

export async function createTest(req:Request, res:Response) {
  const newTestData: TTestUserPost = req.body;

  const newTest = await createTestService.insertNewTest(newTestData);

  res.status(201).send(newTest);
}