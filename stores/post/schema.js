const {schema: media} = require('./sub-schema/media');
const {schema: tag} = require('./sub-schema/tag');
const {Schema} = require('mongoose');

module.exports = {
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
        index: true,
        ref: 'user'
    },
    createdAt: {
        type: Date,
        default: new Date()
    },
    isActive: {
        type: Boolean,
        default: true
    },
    message: String,
    media: [ media ],
    tags: [ tag ],
    updatedAt:{
        type: Date,
        default: new Date()
    }
};
