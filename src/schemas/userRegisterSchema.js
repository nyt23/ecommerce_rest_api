import Joi from 'joi'

export default  Joi.object({
        username: Joi.string().trim().alphanum().min(3).max(20).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(4).required()
});


// const loginSchema = {
//     body: Joi.object({
//         email: Joi.string().email().required(),
//         password: Joi.string().min(4).required()
//     })
// };
//
// const updateSchema = {
//     body: Joi.object({
//         username: Joi.string().trim().alphanum(),
//         email: Joi.string().email(),
//         password: Joi.string().min(4)
//     })
// };



