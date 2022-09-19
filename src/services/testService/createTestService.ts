/* eslint-disable @typescript-eslint/no-throw-literal */
import * as testRepository from '../../repositories/testRepository';
import { TTestUserPost } from '../../types/testTypes';

async function infoValidator(newTest: TTestUserPost) {
  const category = await testRepository.getCategoryByName(newTest.categoryName);
  if (!category) throw { code: 'Not Found', message: 'Category not found' };
  const { id: categoryId } = category;

  const teacher = await testRepository.getTeacherByName(newTest.teacherName);
  if (!teacher) throw { code: 'Not Found', message: 'Teacher not found' };

  const discipline = await testRepository.getDisciplineByName(newTest.disciplineName);
  if (!discipline) throw { code: 'Not Found', message: 'Discipline not found' };

  const teacherDiscipline = await testRepository.getTeacherDisciplineByIds(teacher.id, discipline.id);
  if (!teacherDiscipline) throw { code: 'Not Found', message: 'This relation betwen teacher and discipline dont exist' };
  const { id: teacherDisciplineId } = teacherDiscipline;

  return { categoryId, teacherDisciplineId };
}

export async function insertNewTest(newTest: TTestUserPost) {
  const { categoryId, teacherDisciplineId } = await infoValidator(newTest);

  const insertedNewTest =  await testRepository.insertTest({
    name: newTest.name,
    pdfUrl: newTest.pdfUrl,
    categoryId,
    teacherDisciplineId,
  });
    
  return insertedNewTest;
}