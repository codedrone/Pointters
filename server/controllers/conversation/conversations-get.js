const Promise = require('bluebird');
const { map } = require('lodash');
const { paginate } = require('../../../stores/conversation');
const { findOne: findOneUser } = require('../../../stores/user');
const { Types:{ObjectId} } = require('../../../databases/mongo');

module.exports = async (ctx) => {
	const { lt_id, inputPages, inputLimit } = ctx.query;
    let query = { users: { $in: [ObjectId(ctx.session.id)] } };
    if (lt_id) query._id = { $lt: ObjectId(lt_id) };
    const conversations = await paginate(query, { page: inputPages, limit: inputLimit });

    if (conversations.total == 0 || conversations.error)
        ctx.throw(404, "No conversation found");

    const { docs, total, limit, page, pages } = conversations;
    const results = await Promise.all(map(docs, (doc) => new Promise(async (resolve) => {
        let result = {};
        const users = doc.users;
        result.users = await Promise.all(map(users, (userId) => new Promise(async (resolve) => {
            const res = {};
            res.userId = userId;
            const user = await findOneUser({ _id: userId });
            if(user){
                res.firstName = user.firstName;
                res.lastName = user.lastName;
                res.companyName = user.companyName;
                res.profilePic = user.profilePic;
                res.verified = user.verified;
            }
            return resolve(res);
        })));
        return resolve(result);
    })));
    ctx.status = 200;
    ctx.body = { docs: results, total: total, limit: limit, page: page, pages: pages };

};
