import { Category, Discipline, Teacher, TeacherDiscipline } from '@prisma/client';
import { TTestBasic } from '../types/testTypes';
import { prisma } from '../database/database';

export async function getCategoryByName(name: string): Promise<Category | null> {
  return prisma.category.findUnique({
    where:{ name },
  });
}

export async function getTeacherByName(name: string): Promise<Teacher | null> {
  return prisma.teacher.findUnique({
    where:{ name },
  });
}

export async function getDisciplineByName(name: string): Promise<Discipline | null> {
  return prisma.discipline.findUnique({
    where:{ name },
  });  
}

export async function getTeacherDisciplineByIds(teacherId: number, disciplineId: number): Promise<TeacherDiscipline | null> {
  return prisma.teacherDiscipline.findFirst({
    where:{
      teacherId,
      disciplineId,
    },
  });
}

export async function insertTest(newTest: TTestBasic) {
  return prisma.test.create({
    data: newTest,
  });
}

export async function findTestsByDisciplineId() {
  const result =  await prisma.term.findMany({
    select:{
      number: true,
      Discipline: {
        select:{
          name: true,
          TeacherDiscipline:{
            select:{
              teacher:{
                select:{
                  name: true,
                },
              },
              Test:{
                select:{
                  name: true,
                  pdfUrl: true,
                  category:{
                    select:{
                      name: true,
                    },
                  },
                },
              },
            },
          },
        },                
      },

    },
  });
  return result;
}