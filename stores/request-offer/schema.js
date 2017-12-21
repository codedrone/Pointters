const subschemas = require('./sub-schemas');
const {Schema} = require('mongoose');

module.exports = {
    buyerId: {
        type: Schema.Types.ObjectId,
        required: true,
        index: true,
        ref: 'user'
    },
    createdAt:{
        type: Date,
        default: new Date()
    },
    currencyCode: {
        type: String,
        required: true
    },
    currencySymbol: {
        type: String
    },
    dateLastViewedByRequester: {
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
        type: Number,
        required: true
    },
    priceWithoutDiscount: {
        type: Number
    },    
    requestId:{
        type:Schema.Types.ObjectId,
        required: true
    },
    sellerId: {
        type: Schema.Types.ObjectId,
        required: true,
        index: true,
        ref: 'user'
    },
    updatedAt:{
        type:Date
    },
    workDuration: {
        type: Number,
        required: true
    },
    workDurationUom: {
        type: String,
        enum: [ 'hour', 'day', 'week' ],
        required: true
    }
};
