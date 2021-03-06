const express = require('express');
const app = express();
const Customer = require('./models/Customer')

app.use(express.json());

//endpoints
app.post('/customers', (req, res, next) => {
    Customer
        .insert(req.body)
        .then(customer => res.send(customer))
        .catch(next);
});

app.get('/customers', (req, res, next) => {
    Customer
        .find()
        .then(customer => res.send(customer))
        .catch(next);
});

app.get('/customers/:id', (req, res, next) => {
    Customer
        .findById(req.params.id)
        .then(customer => res.send(customer))
        .catch(next);
});

app.put('/customers/:id', (req, res, next) => {
    Customer
        .update(req.params.id, req.body)
        .then(customer => res.send(customer))
        .catch(next);
});

app.delete('/customers/:id', (req, res, next) => {
    Customer
        .delete(req.params.id)
        .then(customer => res.send(customer))
        .catch(next);
});

module.exports = app;