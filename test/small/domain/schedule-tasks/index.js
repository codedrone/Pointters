const cron = require('cron');

const checkEmailBound = require('./check-email-bounces');
const {schedule:{BounceEmail:scheduleTimeToCheckBounceEmail}} = require('../../config');

module.exports = () => {
    cron(scheduleTimeToCheckBounceEmail, checkEmailBound);
};
