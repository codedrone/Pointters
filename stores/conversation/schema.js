const {Schema} = require('mongoose');

module.exports = {
    users : {
        type: array
    },
    updatedAt: {
        type: Date,
        default: new Date()
    },
    createdAt: {
        type: Date,
        default: new Date()
    }
};


