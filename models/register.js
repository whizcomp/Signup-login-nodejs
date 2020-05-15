const mongoose = require('mongoose');
const Joi = require('joi');
const jwt = require('jsonwebtoken');
const config = require('config')

const registerSchema = new mongoose.Schema({
    name: {
        type: String,
        minlength: 3,
        maxlength: 255,
        required: true
    },
    email: {
        type: String,
        minlength: 3,
        maxlength: 255,
        required: true,
        unique: true
    },
    password: {
        type: String,
        minlength: 6,
        maxlength: 1024,
        required: true
    },
    phone: {
        type: String,
        minlength: 3,
        maxlength: 255,
        required: true
    }
})
registerSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({
        _id: this._id
    }, config.get('privateKey'));
    return token
}
const Register = mongoose.model('Register', registerSchema);

function validateRegister(user) {
    const schema = {
        name: Joi.string().min(3).max(255).required(),
        phone: Joi.string().min(3).max(255).required(),
        password: Joi.string().min(6).max(255).required(),
        email: Joi.string().email().required()
    }
    return Joi.validate(user, schema)
}
exports.Register = Register;
exports.validate = validateRegister;