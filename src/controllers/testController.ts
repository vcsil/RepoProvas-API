import { Request, Response } from 'express';

import { TTestUserPost } from '../types/testTypes';
import * as createTestService from '../services/testService/createTestService';
import * as getTestService from '../services/testService/getTestService';

export async function createTest(req:Request, res:Response) {
  const newTestData: TTestUserPost = req.body;

  const newTest = await createTestService.insertNewTest(newTestData);

  return res.status(201).send(newTest);
}

export async function getTestsByDiscipline(req:Request, res:Response) {
  const tests = await getTestService.getDisciplineTests();
  
  return res.status(200).send(tests);
}