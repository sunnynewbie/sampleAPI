const Joi = require("joi");

exports.userValidate=Joi.object({
    email:Joi.string().min(1).email(),
    password:Joi.string().min(8),
    username:Joi.string().min(3),
    fname:Joi.string(),
    lname:Joi.string()
});
exports.loginValidate=Joi.object({
    email:Joi.string().min(1).email(),
    password:Joi.string().min(8),
});
