const joi = require('joi');
module.exports = (schema) => (req, res, next) => {
    console.log('req.body ===', req.body);
    const {value, error} = joi.validate(req.body, schema);

    if (error) return res.status(400).send('Bad Request');

    req.body = value;
    return next();
};
