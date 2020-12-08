const express = require('express');
const app = express();

app.use(express.json());




require('dotenv').config();

const Dog = require('./model/dogs');

app.post('/dogs', (req, res, next) => {
  Dog.insert(req.body).then((Dog) => res.send(Dog))
    .catch(next);
});

app.get('/dogs', (req, res, next) => {
  Dog.find().then((Dog) => res.send(Dog))
    .catch(next);
});

app.get('/dogs/:id', (req, res, next) => {
  Dog.findByID(req.params.id).then((Dog) => res.send(Dog))
    .catch(next);
});

app.put('/dogs/:id', (req, res, next) => {
  Dog.update(req.params.id, req.body).then((Dog) => res.send(Dog))
    .catch(next);
});

app.delete('/dogs/:id', (req, res, next) => {
  Dog.delete(req.params.id).then((Dog) => res.send(Dog))
    .catch(next);
});

app.listen(9000, () => {
  // console.log('Listening on port 8000');
});








module.exports = app;
