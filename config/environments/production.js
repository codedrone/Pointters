
module.exports = {
    apiName: 'Pointers-API',
    error: {
        stackTraceLimit: 12
    },
    optExpiresIn: 24 * 3600 * 1000,
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
    },
    pagination: {
        requests: 100,
        offers: 100,
        postComments:100,
        requestOffers:100
    }
};
