import { faker } from '@faker-js/faker';

import { prisma } from '../../src/database/database';

function comparador() { 
  return Math.random() - 0.5; 
}

export async function createTest() {
  const category = await prisma.category.findMany({
    select:{
      name:true,
    },
  });
  category.sort(comparador);

  const teacherDiscipline = await prisma.teacherDiscipline.findMany({
    select:{
      teacher:{
        select:{
          name:true,
        },
      },
      discipline:{
        select:{
          name:true,
        },
      },
    },
  });
  teacherDiscipline.sort(comparador);
    
  return {
    name: faker.name.jobArea(),
    pdfUrl: faker.internet.url(),
    categoryName: category[0].name,
    teacherName: teacherDiscipline[0].teacher.name,
    disciplineName: teacherDiscipline[0].discipline.name,
  };
}

export async function createWrongCategoryTest() {
  const teacherDiscipline = await prisma.teacherDiscipline.findMany({
    select:{
      teacher:{
        select:{
          name:true,
        },
      },
      discipline:{
        select:{
          name:true,
        },
      },
    },
  });
  teacherDiscipline.sort(comparador);
    
  return {
    name: faker.name.jobArea(),
    pdfUrl: faker.internet.url(),
    categoryName: faker.name.jobArea(),
    teacherName: teacherDiscipline[0].teacher.name,
    disciplineName: teacherDiscipline[0].discipline.name,
  };
}

export async function createWrongTeacherTest() {
  const category = await prisma.category.findMany({
    select:{
      name:true,
    },
  });
  category.sort(comparador);

  const teacherDiscipline = await prisma.teacherDiscipline.findMany({
    select:{
      discipline:{
        select:{
          name:true,
        },
      },
    },
  });
  teacherDiscipline.sort(comparador);
    
  return {
    name: faker.name.jobArea(),
    pdfUrl: faker.internet.url(),
    categoryName: category[0].name,
    teacherName: faker.name.firstName(),
    disciplineName: teacherDiscipline[0].discipline.name,
  };
}

export async function createWrongDisciplineTest() {
  const category = await prisma.category.findMany({
    select:{
      name:true,
    },
  });
  category.sort(comparador);

  const teacherDiscipline = await prisma.teacherDiscipline.findMany({
    select:{
      teacher:{
        select:{
          name:true,
        },
      },
    },
  });
  teacherDiscipline.sort(comparador);
      
  return {
    name: faker.name.jobArea(),
    pdfUrl: faker.internet.url(),
    categoryName: category[0].name,
    teacherName: teacherDiscipline[0].teacher.name,
    disciplineName: faker.name.jobArea(),
  };
}