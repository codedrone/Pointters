const subschemas = require('./sub-schema');
const {Schema} = require('mongoose');
module.exports = {
    createdAt: {
        type: Date,
        default: new Date()
    },
    updatedAt: {
        type: Date,
        default: new Date()
    },
    buyerId: {
        type: Schema.Types.ObjectId,
        required: true,
        index: true,
        ref: 'user'
    },
    buyerOrderDispute: Object,
    buyerServiceLocation: [ subschemas.location.schema ],
    cancellationDate: Date,
    category: {
        type: Object,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    isActive: {
        type: Boolean,
        default: true
    },
    ulfillmentMethod: subschemas.fulfillmentMethod.schema,
    geofence: Array,
    orderAcceptanceDate: Date,
    orderItems: [ subschemas.item.schema ],
    orderMilestoneStatuses: subschemas.milestoneStatus.schema,
    paymentDate: Date,
    paymentMethod: {
        type: Object,
        required: true
    },
    servicesPrices: [ subschemas.price.schema ],
    transactionFee: Number,
    transactionDate: Date,
    sellerAcceptedScheduleTime: Boolean,
    sellerAcceptedBuyerServiceLocation: Boolean,
    sellerDeliveredMedia: [ subschemas.media.schema ],
    sellerId: {
        type: Schema.Types.ObjectId,
        required: true,
        index: true,
        ref: 'user'
    },
    sellerServiceLocation: [ subschemas.location.schema ],
    serviceScheduleDate: Date,
    serviceStartDate: Date,
    serviceCompleteDate: Date,
    shippingInfo: Object,
    taxes: Object
};
