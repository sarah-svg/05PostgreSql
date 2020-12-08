
const request = require('supertest');
const app = require('../index');

describe('app routes', () => {
  it('POST dogs', async() => {
    const post = {
      name: 'Frank',
      age: 10,
      weight: '10 lbs'
    };
    const expectation = {
      id: 1,
      name: 'Frank',
      age: 10,
      weight: '10 lbs'
    };
    const data = await request(app)
      .post('/dogs')
      .send(post)
      .expect('Content-Type', /json/)
      .expect(200);

    expect(data.body).toEqual(expectation);
  });

  it.skip('GET all dogs', async() => {
    const expectation = [
      {
        id: 1,
        name: 'Frank',
        age: 10,
        weight: '10 lbs'
      },
      {
        id: 3,
        name: 'Frankwenie',
        age: 10,
        weight: '10 lbs'
      },
    ];

    const data = await request(app)
      .get('/dogs/')
      .expect('Content-Type', /json/)
      .expect(200);

    expect(data.body).toEqual(expectation);
  });

  it.skip('GET dog by id', async() => {
    const expectation = {
      id: 1,
      name: 'Frank',
      age: 10,
      weight: '10 lbs'
    };

    const data = await request(app)
      .get('/dogs/1')
      .expect('Content-Type', /json/)
      .expect(200);

    expect(data.body).toEqual(expectation);
  });

  it.skip('PUT dogs', async() => {
    const update = {
       
      name: 'Frank',
      age: 11,
      weight: '10 lbs'
  
    };

    const expectation = {
      id: 1,
      name: 'Frank',
      age: 11,
      weight: '10 lbs'
    };

    const id = 1;

    const data = await request(app)
      .put(`/dogs/${id}`)
      .send(update)
      .expect('Content-Type', /json/)
      .expect(200);

    expect(data.body).toEqual(expectation);
  });

  it.skip('DELETE dogs', async() => {
    const id = 10;
    const expectation = [
      {
        id: 1,
        name: 'Frank',
        age: 11,
        weight: '10 lbs'
      },
    ];

    const data = await request(app)
      .delete(`/dogs/${id}`)
      .expect('Content-Type', /json/)
      .expect(200);

    const dogs = await request(app)
      .get('/dogs/')
      .expect('Content-Type', /json/)
      .expect(200);

    expect(dogs.body).toEqual(expectation);
  });
});
