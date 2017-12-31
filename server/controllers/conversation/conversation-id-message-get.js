const Promise = require('bluebird');
const { map } = require('lodash');
const { findOne: findOneOffer } = require('../../../stores/offer');
const { findOne: findOneUser } = require('../../../stores/user');
const { findOne: findOneService } = require('../../../stores/service');
const { findOne: findOneRequest } = require('../../../stores/request');
const { paginate } = require('../../../stores/message');
const { numOrders } = require('../../../stores/order');
const { avgRating } = require('../../../stores/service-review');
const { Types:{ ObjectId } } = require('../../../databases/mongo');

module.exports = async (ctx) => {
	const { gt_id, lt_id, inputPage, inputLimit } = ctx.query;
    let query = { conversationId: ctx.params.idConversation };
    let sort = { conversationId: 1 };
    if (lt_id) {
        query._id = { $lt: ObjectId(lt_id) };
    }
    if (gt_id) {
        query._id = { $gt: ObjectId(gt_id) };
        sort = { conversationId: -1 };
    }
    const messages = await paginate(query, { page: inputPage, limit: inputLimit, sort: sort });

    if (messages.total == 0 || messages.error)
        ctx.throw(404, "No message found");

    const { docs, total, limit, page, pages } = messages;
    const results = await Promise.all(map(docs, (doc) => new Promise(async (resolve) => {
        let result = {};
        result.result = {};

				//populate result with message
				result.result.message = {};
        result.result.message.createdAt = doc.createdAt;
        result.result.message.updatedAt = doc.updatedAt;
        result.result.message.messageText = doc.messageText;
        result.result.message.media = doc.media;

				//populate result with user
				if(doc.userId){
					result.result.user = {};
					result.result.user.userId = doc.userId;
					const user = await findOneUser({ _id: doc.userId });
					if(user) {
							result.result.user.firstName = user.firstName;
							result.result.user.lastName = user.lastName;
							result.result.user.companyName = user.companyName;
							result.result.user.profilePic = user.profilePic;
							result.result.user.verified = user.verified;
					}
				}

				//populate result with service
				if(doc.serviceId){
					result.result.service = {};
	        result.result.service.serviceId = doc.serviceId;
	        const service = await findOneService({ _id: doc.serviceId });
	        if(service) {
	            result.result.service.description = service.description;
							if(service.media) result.result.service.media = service.media[0];
	            if(service.price) result.result.service.price = service.price[0];
	        }
				}

				//populate result with offer
				if(doc.offerId){
					result.result.offer = {};
	        result.result.offer.offerId = doc.offerId;
	        const offer = await findOneOffer({ _id: doc.offerId });
	        if(offer) {
	            result.result.offer.description = offer.description;
							if(offer.media && offer.media.length>0) result.result.offer.media = offer.media[0];
	            result.result.offer.price = offer.price;
	            result.result.offer.workDuration = offer.workDuration;
	            result.result.offer.workDurationUom = offer.workDurationUom;

							//if offer has no media, then populate offer image from linked service or seller
							if((!offer.media || offer.media.length<1)){
								if(offer.serviceId){
									const offerSevice = await findOneService({ _id: offer.serviceId });
			            if(offerSevice) {
											if(offerSevice.media) result.result.offer.media = offerSevice.media[0];
			            }
								}else{
									const offerSeller = await findOneUser({ _id: offer.sellerId });
			            if(offerSeller) result.result.offer.media = offerSeller.profilePic;
								}
							}
	        }
				}

				if(doc.requestId){
					result.result.request = {};
	        result.result.request.requestId = doc.requestId;
	        const request = await findOneRequest({ _id: doc.requestId });
	        if(request) {
	            result.result.request.description = request.description;
	            if(request.media && request.media.length>0) result.result.request.media = request.media[0];
	            result.result.request.minPrice = request.minPrice;
	            result.result.request.maxPrice = request.maxPrice;
	            result.result.request.scheduleDate = request.scheduleDate;
	        }
				}

        return resolve(result);
    })));
    ctx.status = 200;
    ctx.body = { docs: results, total: total, limit: limit, page: page, pages: pages };

};
