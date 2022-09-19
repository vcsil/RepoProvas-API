import supertest from 'supertest';

import { createToken } from './factories/userFactory'; 
import app from '../src/app';
import { createTest, createWrongCategoryTest, createWrongDisciplineTest, createWrongTeacherTest } from './factories/testFactory';

describe('Testa POST /test', () => {
  it('Testa Test com body correto -> deve retornar 201 e o teste criado.', async () => {
    const token = await createToken();

    const test = await createTest();
        
    const result = await supertest(app)
      .post('/test')
      .set('Authorization', 'Bearer ' + token)
      .send(test);

    expect(result.status).toEqual(201);     
    expect(result.body).toBeInstanceOf(Object);      
  });

  it('Testa Test com body incorreto -> deve retornar 422 e o teste criado.', async () => {
    const token = await createToken();

    const test = await createTest();
    test.pdfUrl = '';
        
    const result = await supertest(app)
      .post('/test')
      .set('Authorization', 'Bearer ' + token)
      .send(test);

    expect(result.status).toEqual(422);           
  });

  it('Testa Test com categoria incorreta -> deve retornar 404', async () => {
    const token = await createToken();

    const test = await createWrongCategoryTest();
        
    const result = await supertest(app)
      .post('/test')
      .set('Authorization', 'Bearer ' + token)
      .send(test);

    expect(result.status).toEqual(404);           
  });

  it('Testa Test com professor incorreto -> deve retornar 404', async () => {
    const token = await createToken();

    const test = await createWrongTeacherTest();
        
    const result = await supertest(app)
      .post('/test')
      .set('Authorization', 'Bearer ' + token)
      .send(test);

    expect(result.status).toEqual(404);           
  });

  it('Testa Test com disciplina incorreta -> deve retornar 404', async () => {
    const token = await createToken();

    const test = await createWrongDisciplineTest();
        
    const result = await supertest(app)
      .post('/test')
      .set('Authorization', 'Bearer ' + token)
      .send(test);

    expect(result.status).toEqual(404);           
  });
});