const cron = require('cron');

const checkEmailBounce = require('./check-email-bounces');
const checkEmailSpam = require('./check-email-bounces');
const checkEmailInvalid = require('./check-email-bounces');
const {schedule:
    {BounceEmail:scheduleTimeToCheckBounceEmail,
    SpamEmail:scheduleTimeToCheckSpamEmail,
    IvalidEmail:scheduleTimeToCheckInvalidEmail}
} = require('../../config');

module.exports = () => {
    cron(scheduleTimeToCheckBounceEmail, checkEmailBounce);
    cron(scheduleTimeToCheckSpamEmail, checkEmailSpam);
    cron(scheduleTimeToCheckInvalidEmail, checkEmailInvalid);
};
