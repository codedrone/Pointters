
module.exports = {
    apiName: 'Pointers-API-dev',
    review: {
        minLengthForComment: 0
    },
    error: {
        stackTraceLimit: 12
    },
    optExpiresIn: 24 * 3600 * 1000,
    rateLimit: 1000,
    port: 9000,

    jwt: {
        secret: 'pointers-secret-key',
        expiresIn: 3600000 * 24 * 365,
    },
    dbpath: 'mongodb://127.0.0.1/pointters-api',

    mongo: {
        options: {
            db: {
                safe: true
            }
        }
    },
    pagination: {
        requests: 2
    }
};
