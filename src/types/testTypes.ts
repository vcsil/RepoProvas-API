import { Test } from '@prisma/client';

export type TTestUserPost = {
  name: string;
  pdfUrl: string;
  categoryName: string;
  disciplineName: string;
  teacherName: string;
};

export type TTestBasic = Omit<Test, 'id'>;