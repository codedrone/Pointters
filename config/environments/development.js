

// Development specific configuration
// ===========================

module.exports = {
    apiName: 'Pinters-API-dev',
    error: {
        stackTraceLimit: 12
    },
    port: 9000,

    jwt: {
        secret: 'pointters-secret-key',
        expiresIn: '1h'
    },
    dbpath: 'mongodb://localhost/pointters-api',

    // MongoDB connection options
    mongo: {
        options: {
            db: {
                safe: true
            }
        }
    }
};
