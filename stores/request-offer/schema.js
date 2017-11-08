const subschemas = require('./sub-schemas');
const {Schema} = require('mongoose');

module.exports = {
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
        index: true,
        ref: 'user'
    },
    createdAt:{
        type: Date,
        default: new Date()
    },
    fulfillmentMethod:subschemas.fulfillmentMethod.schema,
    isActive: {
        type: Boolean,
        default: true
    },
    location:subschemas.location.schema,
    media:[subschemas.media.schema],
    price:{
        type:Object
    },
    requestId:{
        type:Schema.Types.ObjectId,
        required: true
    },
    updatedAt:{
        type:Date
    },
    workDuration:{
        type:Object
    },
    workDurationUom:{
        type: String,
        enum: [ 'hour', 'day', 'week' ]
    },
};
