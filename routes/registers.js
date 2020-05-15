const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const _ = require('lodash')
const auth = require('../middleware/auth')
const {
    validate,
    Register
} = require('../models/register')
require('express-async-errors');

router.get('/me', auth, async (req, res) => {

    const user = await Register.findById(req.user._id);
    res.send(user);
})
router.post('/', async (req, res) => {
    const {
        error
    } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    let user = await Register.findOne({
        email: req.body.email
    });
    if (user) return res.status(400).send('user already registered');

    user = new Register(_.pick(req.body, ['name', 'email', 'password', 'phone']));
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    await user.save();
    const token = user.generateAuthToken();
    res.header('x-auth-token', token).send(_.pick(user, ['name', 'email', 'phone']));
})
module.exports = router;