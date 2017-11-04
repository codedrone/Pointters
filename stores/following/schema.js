const {Schema} = require('mongoose');

module.exports = {
    followFrom : {
        type:Schema.Types.ObjectId,
        required: true,
        index: true,
        ref: 'user'
    },
    followTo : {
        type:Schema.Types.ObjectId,
        required: true,
        index: true,
        ref: 'user'
    }
};


