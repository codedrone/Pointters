const nock = require('nock');


module.exports = (fromEmail, toEmail, subject, content) => {
    const body = {
        from: {
            email: fromEmail
        },
        personalizations: [
            {
                to: [
                    {
                        email: toEmail
                    }
                ]
            }
        ],
        subject,
        content: [
            {
                type: 'text/plain',
                value: content
            }
        ]
    };
    nock('https://api.sendgrid.com:443', { encodedQueryParams: true })
        .post('/v3/mail/send', body)
        .reply(202, '', [ 'Server',
            'nginx',
            'Date',
            'Wed, 16 Aug 2017 20:38:36 GMT',
            'Content-Type',
            'text/plain; charset=utf-8',
            'Content-Length',
            '0',
            'Connection',
            'close',
            'X-Message-Id',
            'zb0J0TOeRq6AYBNWmMs4oQ',
            'X-Frame-Options',
            'DENY',
            'Access-Control-Allow-Origin',
            'https://sendgrid.api-docs.io',
            'Access-Control-Allow-Methods',
            'POST',
            'Access-Control-Allow-Headers',
            'Authorization, Content-Type, On-behalf-of, x-sg-elas-acl',
            'Access-Control-Max-Age',
            '600',
            'X-No-CORS-Reason',
            'https://sendgrid.com/docs/Classroom/Basics/API/cors.html' ]);
};
