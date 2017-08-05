const joi = require('joi');

const fields = [ 'generalNotifications',
    'orderNotifications',
    'offerNotifications',
    'summaryEmail'
];

module.exports = joi.object().keys({
    fields: joi.array().items(fields)
});
