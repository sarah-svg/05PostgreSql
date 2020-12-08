const express = require('express');
const app = express();

app.use(express.json());




require('dotenv').config();

const Dog = require('./model/dogs');

app.post('/dogs', (req, res) => {
  Dog.insert(req.body).then((Dog) => res.send(Dog));
});

app.get('/dogs', (req, res) => {
  Dog.find().then((Dog) => res.send(Dog));
});

app.get('/dogs/:id', (req, res) => {
  Dog.findByID(req.params.id).then((Dog) => res.send(Dog));
});

app.put('/dogs/:id', (req, res) => {
  Dog.update(req.params.id, req.body).then((Dog) => res.send(Dog));
});

app.delete('/dogs/:id', (req, res) => {
  Dog.delete(req.params.id).then((Dog) => res.send(Dog));
});

app.listen(9000, () => {
  // console.log('Listening on port 8000');
});








module.exports = app;
