const {schema: subCategories} = require('./sub-schema/sub-category');
const {Schema} = require('mongoose');
module.exports = {
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
        index: true,
        ref: 'user'
    },
    isActive:{
        type:Boolean,
        default:true,
    },
    keywords: [ String ],
    name: {
        type: String,
        required: true,
        unique:true
    },
    subCategories: [ subCategories ]
};
