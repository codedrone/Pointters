const joi = require('joi');
module.exports = (schema) => (req, res, next) => {
    const {value, error} = joi.validate(req.params, schema);

    if (error) return res.status(400).send('Bad Request');

    req.params = value;
    return next();
};
