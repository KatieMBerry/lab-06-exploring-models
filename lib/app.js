const express = require('express');
const app = express();

//endpoints
app.get('/customers', (req, res) => {
    res.send('hello');
});

module.exports = app;