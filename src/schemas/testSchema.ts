import joi from 'joi';
import { TTestUserPost } from 'types/testTypes';

export const testSchema = joi.object<TTestUserPost>({
  name: joi.string().required(),
  pdfUrl: joi.string().uri().required(),
  categoryName: joi.string().required(),
  disciplineName: joi.string().required(),
  teacherName: joi.string().required(),
});