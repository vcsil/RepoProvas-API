import { NextFunction, Request, Response } from 'express';

import { IError } from '../types/errorTypes';

export default function errorHandler(
  error: IError, 
  req: Request,  
  res: Response, 
  next: NextFunction,
) {

  if (error.code === 'Bad Request') return res.status(400).send(error.message);
  if (error.code === 'Unauthorized') return res.status(401).send(error.message);
  if (error.code === 'Not Found') return res.status(404).send(error.message);
  if (error.code === 'Conflict') return res.status(409).send(error.message);
  if (error.code === 'Unprocessable entity') return res.status(422).send(error.message);

  return res.sendStatus(500); // internal server error
}