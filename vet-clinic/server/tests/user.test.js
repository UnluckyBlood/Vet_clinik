const request = require('supertest');
const app = require('../index');

describe('Регистрация пользователя', () => {
  it('Должен создавать нового пользователя', async () => {
    const res = await request(app)
      .post('/api/register')
      .send({
        name: 'Иван',
        email: 'test@example.com',
        phone: '79991234567',
        password: '12345678',
        role: 'admin'
      });
    expect(res.statusCode).toEqual(201);
  });
});