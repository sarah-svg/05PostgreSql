require('dotenv').config();
const express = require('express');

const Gocart = require('./models/gocart');

const app = express();


app.use(express.json());

//////CRUD post route
app.post('/api/v1/cars', (req, res, next) => {
  Gocart
    .insert(req.body)
    .then(car => {
      return res.send(car);
    })
    .catch(next);
});
///////CRUD get by id
app.get('/api/v1/cars/:id', (req, res, next) => {

  Gocart
    .findById(req.params.id)
    .then(cars => res.send(cars))
    .catch(next);
  
      
});
//////////CRUD get all cars
app.get('/api/v1/cars', (req, res, next) => {
  Gocart
    .find()
    .then(car => res.send(car))
    .catch(next);
 
});
///////CRUD update car
app.put('/api/v1/cars/:id', (req, res, next) => {
  Gocart
    .update(req.params.id, req.body)
    .then(car => res.send(car))
    .catch(next);

});
///////////CRUD DELETE CAR
app.delete('/api/v1/cars/:id', (req, res, next) => {
  Gocart
    .delete(req.params.id)
    .then(car => res.send(car))
    .catch(next);  
    
});


module.exports = app;
