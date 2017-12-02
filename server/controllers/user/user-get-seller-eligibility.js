const { findOne: findOneUser } = require('../../../stores/user');
const { count } = require('../../../stores/service');
const errorMessage = 'Error in find user';

module.exports = async(ctx) => {
    const user = await findOneUser({ _id: ctx.session.id });
    if (!user || user.error) ctx.throw(404, errorMessage);
    let result = {};
    if(user.paymentMethod)
        result.hasPayment = true;
    else
        result.hasPayment = false;
    result.numServices = await count({ userId: ctx.session.id });
    result.isVerified  = user.isVerified;
    if(user.storeLocations )
        result.hasStoreLocations = true;
    else
        result.hasStoreLocations = false;
    ctx.status = 200;
    ctx.body = { result };
};