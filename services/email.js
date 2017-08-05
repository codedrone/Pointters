const mandrill = require('node-mandrill');

const send = (email, email_subject, text) => new Promise((resolve, reject) => {
    const params = {
        message: {
            to: [ { email, name: email } ],
            from_email: process.env.MANDRILL_SENDER_EMAIL,
            subject: email_subject,
            text: text
        }
    };
    mandrill('/messages/send', params, (error) => {
        if (error) return reject(JSON.stringify(error), null);

        const response = {
            success: true,
            message: `An e-mail has been sent to ${email} with instructions to reset the passowrd `,
            text: text
        };
        resolve(null, response);
    });
});

const sendTemplate = (template, email, mergeVars) => new Promise((resolve, reject) => {
    const options = {
        template_name: template,
        template_content: [
        ],
        message: {
            to: [ { email } ],
            global_merge_vars: mergeVars
        },
        auto_text: true,
        inline_css: true,
        merge: true,
        merge_language: 'handlebars'
    };

    mandrill('/messages/send-template', options, (error, res) => {
        if (error) return reject(JSON.stringify(error));
        resolve(null, res);
    });
});

module.exports = { send, sendTemplate };
