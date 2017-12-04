const { find: findRequest, count } = require('../../../../stores/request');
const {pagination:{requests:limit}} = require('../../../../config');
const {Types:{ObjectId}} = require('../../../../databases/mongo');
const getQuery = require('./get-query');
const errorMessage = 'Request does not exists';

module.exports = async(ctx) => {
    const query = getQuery(ctx);
    const requests = await findRequest(query, {limit});
    if (!requests || !requests.length || requests.error) ctx.throw(404, errorMessage);
    if (ctx.params.idRequest) {
        ctx.body = {
            request: requests[0]
        };
        return;
    }
    ctx.body = {requests};
    const lastOne = requests[requests.length - 1];
    const remaining = await count({_id:{$gt: ObjectId(lastOne._id)}});
    if (remaining) ctx.body.next = `${ctx.url}?id_gt=${lastOne._id}`;
};
