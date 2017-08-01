
module.exports = {
    apiName: 'Pinters-API',
    error: {
        stackTraceLimit: 12
    },
    rateLimit: 1000,
    port: 9000,

    jwt: {
        secret: 'pointters-secret-key',
        expiresIn: 3600000 * 24 * 365,
    },
    dbpath: 'mongodb://localhost/pointters-api',

    mongo: {
        options: {
            db: {
                safe: true
            }
        }
    }
};
