const { Joi } = require('express-validation');

module.exports = {

    registerSchema: {
        body: Joi.object({
            username: Joi.string().trim().alphanum().required(),
            email: Joi.string().email().required(),
            password: Joi.string().min(4).required()
        })
    },
    loginSchema: {
        body: Joi.object({
            email: Joi.string().email().required(),
            password: Joi.string().min(4).required()
        })
    },
    updateSchema: {
        body: Joi.object({
            username: Joi.string().trim().alphanum(),
            email: Joi.string().email(),
            password: Joi.string().min(4)
        })
    }
};