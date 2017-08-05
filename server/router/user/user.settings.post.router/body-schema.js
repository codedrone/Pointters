const joi = require('joi');

const generalNotifications = [ 'pushNotification', 'email' ];
const orderNotifications = [ 'pushNotification', 'email' ];
const offerNotifications = [ 'pushNotification', 'email' ];
const summaryEmail = [ 'daily', 'weekly' ];

module.exports = joi.object().keys({
    generalNotifications: joi.string().valid(generalNotifications),
    orderNotifications: joi.string().valid(orderNotifications),
    offerNotifications: joi.string().valid(offerNotifications),
    summaryEmail: joi.string().valid(summaryEmail)
});
