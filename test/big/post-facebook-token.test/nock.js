const nock = require('nock');

module.exports = (token, id, name) => {
    nock('https://graph.facebook.com:443', { encodedQueryParams: true })
        .get('/me/')
        .query({ access_token: token })
        .reply(200, {
            id,
            name
        }, ['Access-Control-Allow-Origin',
            '*',
            'WWW-Authenticate',
            'OAuth "Facebook Platform" "invalid_token" "Invalid OAuth access token."',
            'Pragma',
            'no-cache',
            'Cache-Control',
            'no-store',
            'x-fb-rev',
            '3194763',
            'Content-Type',
            'text/javascript; charset=UTF-8',
            'x-fb-trace-id',
            'DLwBlNNtwL2',
            'Expires',
            'Sat, 01 Jan 2000 00:00:00 GMT',
            'X-FB-Debug',
            'B1kTQlqcoUj//vznoeRDtArKt3iDqXxUVBbHeiWyx+R0LOH014p5meoGMyfzlFlvjEd+E1Q1erqV3ocByxV90A==',
            'Date',
            'Tue, 01 Aug 2017 22:27:00 GMT',
            'Connection',
            'close',
            'Content-Length',
            '113']);

    nock('https://graph.facebook.com:443', { encodedQueryParams: true })
        .get('/me/')
        .query(true)
        .reply(200, { error: 'this error happen only in test' }, ['Access-Control-Allow-Origin',
            '*',
            'WWW-Authenticate',
            'OAuth "Facebook Platform" "invalid_token" "Invalid OAuth access token."',
            'Pragma',
            'no-cache',
            'Cache-Control',
            'no-store',
            'x-fb-rev',
            '3194763',
            'Content-Type',
            'text/javascript; charset=UTF-8',
            'x-fb-trace-id',
            'DLwBlNNtwL2',
            'Expires',
            'Sat, 01 Jan 2000 00:00:00 GMT',
            'X-FB-Debug',
            'B1kTQlqcoUj//vznoeRDtArKt3iDqXxUVBbHeiWyx+R0LOH014p5meoGMyfzlFlvjEd+E1Q1erqV3ocByxV90A==',
            'Date',
            'Tue, 01 Aug 2017 22:27:00 GMT',
            'Connection',
            'close',
            'Content-Length',
            '113']);
};
