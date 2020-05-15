const express = require('express');
const router = express.Router();
const {
    Register
} = require('../models/register')
const bcrypt = require('bcrypt')
const Joi = require('joi');


router.post('/', async (req, res) => {
    const {
        error
    } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user = await Register.findOne({
        email: req.body.email
    });
    if (!user) return res.status(401).send('invalid email or password!');

    passwordVerify = await bcrypt.compare(req.body.password, user.password)
    if (!passwordVerify) return res.status(401).send('invalid email or password ');

    const token = user.generateAuthToken();
    res.send(token);
});

function validate(req) {
    const schema = {
        email: Joi.string().email().required(),
        password: Joi.string().min(3).max(255).required()
    }
    return Joi.validate(req, schema);
}
module.exports = router;