

module.exports = {
    apiName: 'Pinters-API-dev',
    port: 9000,
    error: {
        stackTraceLimit: 20
    },
    jwt: {
        secret: 'pointters-secret-key',
        expiresIn: '1h'
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
