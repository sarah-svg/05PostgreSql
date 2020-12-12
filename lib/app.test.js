require('dotenv').config();
const app = require('./app.js');

const  request  = require('supertest');

const fs = require('fs');
const pool = require('./utils/pool');

const Gocart = require('./models/gocart');
// const Car = require('./car');


describe('Car model', () => {
  beforeEach(() => {
    return pool.query(fs.readFileSync('./sql/setup.sql', 'utf-8'));

  });

  afterAll(() => {
    return pool.end();
  });
  ////////post car test
  it('creates a new car via POST', async() => {
    const res = await request(app)
      .post('/api/v1/cars')
      .send({
        make: 'chevy',
        model: 'impala',
        year: 2018
    

      });

    expect(res.body).toEqual({
      id: '1',
      make: 'chevy',
      model: 'impala',
      year: 2018
    });
  });

  ////GETS BY ID
  it('finds a car by id via GET', async() => {
    const car = await Gocart.insert({   make: 'chevy',
      model: 'impala',
      year: 2018 });

    const response = await request(app)
      .get(`/api/v1/cars/${car.id}`);

    expect(response.body).toEqual(car);
  });
  //////GETS ALL CARS
  it('finds all cars via GET', async() => {
    const car = await Promise.all([
      {
        make: 'chevy',
        model: 'impala',
        year: 2018
      },
      {
        make: 'chevy',
        model: 'impala',
        year: 2018
      },
    ].map(car => Gocart.insert(car)));
    const res = await request(app)
      .get('/api/v1/cars');

    expect(res.body).toEqual(expect.arrayContaining(car));
    expect(res.body).toHaveLength(car.length);
  });
  //////updates cars
  it('updates a car via PUT', async() => {
    const car = await Gocart.insert({
      make: 'chevy',
      model: 'impala',
      year: 2018
    });

    const res = await request(app)
      .put(`/api/v1/cars/${car.id}`)
      .send({
        make: 'chevy',
        model: 'impala',
        year: 2018
      });

    expect(res.body).toEqual({
      'id': '1',
      'make': 'chevy',
      'model': 'impala',
      'year': 2018
    });
  });
  ////////delete a car


  it('deletes a car via DELETE', async() => {
    const car = await Gocart.insert({
      'make': 'chevy',
      'model': 'impala',
      'year': 2018
    
    });
  
    const res = await request(app)
      .delete(`/api/v1/cars/${car.id}`);
  
    expect(res.body).toEqual(car);
  });
  



});
