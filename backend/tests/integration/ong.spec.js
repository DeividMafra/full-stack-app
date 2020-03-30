const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/connection');

describe('ONG', () => {
  beforeEach(async () => {
    await connection.migrate.rollback(); //Delete migrations (database)
    await connection.migrate.latest(); // run migrations (create database)
  });

  afterAll(async () => {
    await connection.destroy();
  });
  it('should be able to creatae a new ONG', async () => {
    const response = await request(app)
      .post('/ongs')
      // .set('Authorization', '4a2c80a2') - to set something in the Header
      .send({
        name: "Dieguits Foundation",
        email: "dapohp@gmail.com",
        whatsapp: "16474102833",
        city: "Toronto",
        uf: "ON"
      });
    // console.log(response.body)
    expect(response.body).toHaveProperty('id');
    expect(response.body.id).toHaveLength(8);
  });
});