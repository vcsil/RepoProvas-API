import * as testRepository from '../../repositories/testRepository';

export async function getDisciplineTests() {
  const tests = await testRepository.findTestsByDisciplineId() as any;

  try {

    tests.forEach((i: { disciplines: any[]; }) => {
      i.disciplines.forEach((j: { teacherDiscipline: any[]; }) => {
        j.teacherDiscipline.forEach((k: { teacher?: { name: any; }; tests: any[]; }) => {
          const teacher = k.teacher?.name;
          delete k.teacher;
          k.tests.forEach((l: { teacher: any; category: { name: any; }; })=>{
            l.teacher = teacher;
            l.category = l.category.name;
          });
        });
      });
    });
  } catch (error) {
    console.log(error);
    return tests;
  }

  return tests;
}