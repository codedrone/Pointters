const joi = require('joi');

const generalNotifications = [ 'pushNotification', 'email', 'all' ];
const orderNotifications = [ 'pushNotification', 'email', 'all' ];
const offerNotifications = [ 'pushNotification', 'email', 'all' ];
const summaryEmail = [ 'daily', 'weekly', 'all' ];
const defaultSummaryEmail = 'all';

module.exports = joi.object().keys({
    generalNotifications: joi.string().valid(generalNotifications),
    orderNotifications: joi.string().valid(orderNotifications),
    offerNotifications: joi.string().valid(offerNotifications),
    summaryEmail: joi.string().valid(summaryEmail).default(defaultSummaryEmail)
});
