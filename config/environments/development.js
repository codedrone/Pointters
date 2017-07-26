'use strict';

// Development specific configuration
// ===========================

module.exports = {

    port: 9000,

    secret: 'pointters-secret-key',

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
