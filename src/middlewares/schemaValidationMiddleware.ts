import { NextFunction, Request, Response } from 'express';
import { ObjectSchema } from 'joi';

type ReqHTTPTypes = | 'headers' | 'body';

type ParameterHeaderTypes = | 'x-api-key' | 'authorization';

export default function validateSchema(
  schema: ObjectSchema, 
  reqHTTP: ReqHTTPTypes, 
  parameterHeader?: ParameterHeaderTypes,
) {
  return (req: Request, res: Response, next: NextFunction) => {
    const objectHTTP = parameterHeader ? eval('req.' + reqHTTP)[parameterHeader || '']
      : eval('req.' + reqHTTP)
    ;

    const { error } = schema.validate(objectHTTP, { abortEarly: false });
    if (error) {
      return res
        .status(422)
        .send(error.details.map((detail: any) => detail.message));
    }

    return next();
  };
}
