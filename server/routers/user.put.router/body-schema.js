const joi = require('joi');


module.exports = joi.object().keys({
    awards: joi.string(),
    companyName: joi.string(),
    description: joi.string(),
    education: joi.string(),
    email: joi.string(),
    password: joi.string(),
    firstName: joi.string(),
    insurance: joi.string(),
    lastName: joi.string(),
    license: joi.string(),
    location: joi.object().default({}),
    phone: joi.string(),
    profilePic: joi.string(),
    profileBackgroundImages: joi.object().default({})
});
