import { Request, Response } from 'express';

import { TAuthBasic } from '../types/authTypes';
import * as signUpService from '../services/authServices/signUpService';
import * as signInService from '../services/authServices/signInService';


export async function signUp(req: Request, res: Response) {
  const { email, password }: TAuthBasic = req.body;

  await signUpService.signup({ email, password });

  return res.sendStatus(201);
}

export async function signIn(req: Request, res: Response) {
  const { email, password }: TAuthBasic = req.body;
  
  const jwtToken = await signInService.signin({ email, password });
  
  return res.status(200).send(jwtToken);
}

