const { find: findRequest, count } = require('../../../stores/request');
const {pagination:{requests:limit}} = require('../../../config');
const {Types:{ObjectId}} = require('../../../databases/mongo');

const errorMessage = 'Request does not exists';

module.exports = async(ctx) => {
    const query = {userId: ctx.state.user.id};

    if (ctx.params.idRequest) query._id = ctx.params.idRequest;
    if (ctx.query.id_gt) query._id = {$gt: ctx.query.id_gt};
    console.log('query = ', query);
    const requests = await findRequest(query, {limit});

    if (!requests || requests.error) ctx.throw(404, errorMessage);

    if (ctx.params.idRequest) {
        ctx.body = {
            request: requests[0]
        };
        return;
    }
    ctx.body = {requests};
    const lastOne = requests[requests.length - 1];
    console.log('lastOne ', lastOne);

    const remaining = await count({
        _id:{
            $gt: ObjectId(lastOne._id)
        }
    });
    console.log('remaining ', remaining);
    if (remaining) ctx.body.next = `/requests/?id_gt=${lastOne._id}`;
};
