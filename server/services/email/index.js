const mandrill = require('node-mandrill');

const send = function(to, email_subject, text, callback) {
    mandrill('/messages/send', {
        message: {
            to: [ {email: to, name: to} ],
            from_email: process.env.MANDRILL_SENDER_EMAIL,
            subject: email_subject,
            text: text
        }
    }, (error) => {
        if (error) callback(JSON.stringify(error));
        else return callback(null, {
            success: true,
            // resetURL: resetURL,
            message: `an e-mail has been sent to ${ to } with instructions to reset the passowrd `,
            text: text
        });
    });
};

function sendTemplate(template_name, email, global_merge_vars, callback) {
    const options = {
        template_name: template_name,
        template_content: [
        ],
        message: {
            to: [
                {
                    email: email
                }
            ],
            global_merge_vars: global_merge_vars
        },
        auto_text: true,
        inline_css: true,
        merge: true,
        merge_language: 'handlebars'
    };

    mandrill('/messages/send-template', options, (error) => {
        if (error) callback(JSON.stringify(error));
        else return callback(null);
    });
}

exports.send = send;
exports.sendTemplate = sendTemplate;
