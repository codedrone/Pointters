const { find: findOffer, count } = require('../../../../stores/offer');
const { findOne: findOneService } = require('../../../../stores/service');
const { findOne: findOneUser } = require('../../../../stores/user');
const {pagination:{offers:limit}} = require('../../../../config');
const {Types:{ObjectId}} = require('../../../../databases/mongo');
const getQuery = require('./get-query');

const errorInGetWatching = 'Error in get to offer-offer';
module.exports = async (ctx) => {
    const query = getQuery(ctx);
    const offers = await findOffer(query, {limit});
    if (!offers || !offers.length || offers.error) ctx.throw(404, errorInGetWatching);

    if (ctx.params.idOffer) {
      //populate location and media from linked service
      if ((!offers[0].location || !offers[0].media) && offers[0].serviceId) {
        const ServiceData = await findOneService({ _id: ObjectId(offers[0].serviceId) });
        if(ServiceData)
        {
            offers[0].service = {};
            offers[0].service.description = ServiceData.description;
            if (!offers[0].location && ServiceData.location) offers[0].location=ServiceData.location[0];
            if ((!offers[0].media || offers[0].media.length < 1) && ServiceData.media) offers[0].media=ServiceData.media[0];
        }
      }

      //populate location and media from user when fulfillmentMethod is local or store
      if((!offers[0].location || !offers[0].media) && (offers[0].fulfillmentMethod.local || offers[0].fulfillmentMethod.store)){
        const userData = await findOneUser({ _id: ObjectId(offers[0].sellerId) });
        if(userData)
        {
          if (!offers[0].location && userData.location) offers[0].location=userData.location;
          if (!offers[0].media || offers[0].media.length < 1 ) {
            offers[0].media=[{
              fileName:userData.profilePic,
              mediaType:"image"
            }];
          }
        }
      }

        ctx.body = {
            offer: offers[0]
        };
        return;
    }
    ctx.body = {offers};
    const lastOne = offers[offers.length - 1];
    const remaining = await count({_id:{$gt: ObjectId(lastOne._id)}});
    if (remaining) ctx.body.next = `${ctx.url}?id_gt=${lastOne._id}`;
};
