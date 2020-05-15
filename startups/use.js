const express = require('express')
const registers = require('../routes/registers');
const login = require('../routes/login');
const error = require('../middleware/error')
module.exports = function (app) {
    app.use(express.json())
    app.use('/api/register', registers);
    app.use('/api/login', login);
    app.use(error)
}