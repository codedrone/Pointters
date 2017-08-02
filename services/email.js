const mandrill = require('node-mandrill');

const send = (email, email_subject, text, callback) => {
    const params = {
        message: {
            to: [ {email, name: email} ],
            from_email: process.env.MANDRILL_SENDER_EMAIL,
            subject: email_subject,
            text: text
        }
    };
    mandrill('/messages/send', params, (error) => {
        if (error) return callback(JSON.stringify(error), null);

        const response = {
            success: true,
            message: `An e-mail has been sent to ${ email } with instructions to reset the passowrd `,
            text: text
        };
        callback(null, response);
    });
};

function sendTemplate(template_name, email, global_merge_vars, callback) {
    const options = {
        template_name: template_name,
        template_content: [
        ],
        message: {
            to: [ {email} ],
            global_merge_vars: global_merge_vars
        },
        auto_text: true,
        inline_css: true,
        merge: true,
        merge_language: 'handlebars'
    };

    mandrill('/messages/send-template', options, (error, res) => {
        if (error) return callback(JSON.stringify(error));
        callback(null, res);
    });
}

module.exports = {send, sendTemplate};
