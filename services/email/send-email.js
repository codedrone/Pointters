const SendGrid = require('sendgrid');

const sg = require('./client');
const { emailSenderingCong: { emailRemitentInOpt } } = require('../../config');

const helper = SendGrid.mail;

const sendEmail = async(emailReceiver, subject, _content) => {
    const fromEmail = new helper.Email(emailRemitentInOpt);
    const toEmail = new helper.Email(emailReceiver);
    const content = new helper.Content('text/plain', _content);
    const mail = new helper.Mail(fromEmail, subject, toEmail, content);

    const request = sg.emptyRequest({
        method: 'POST',
        path: '/v3/mail/send',
        body: mail.toJSON()
    });

    return await sg.API(request);
};

module.exports = sendEmail;
