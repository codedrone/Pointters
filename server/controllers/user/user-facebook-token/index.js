
const { findOne } = require('../../../../stores/user');
const signToken = require('../../../lib/sign-token');
const getHeaders = require('../../../lib/get-headers');
const getSession = require('../../../lib/get-session');
const {socialNetwork:{facebook:{validateFacebookToken}}} = require('../../../../services');
const createUser = require('./create-user');
const debug = require('../../../../lib/debug');

const successMessage = 'Successful created a new user.';
const socialNetwork = 'facebook';
module.exports = async(ctx) => {
    const {body:{token: facebookToken}} = ctx.request;
    const { name, id: idFacebook, error } = await validateFacebookToken(facebookToken);

    if (error) {
        debug.service.error(`Error from facebook ${error.message}`);
        ctx.status = 403;
        ctx.body = {msg: 'Token not Valid'};
        return;
    }

    const savedUser = await findOne({
        'socialNetwork.id': idFacebook,
        'socialNetwork.name': socialNetwork
    });
    let userCreatedOrUpdated = savedUser;
    const [ firstName, lastName ] = name.split(' ');
    if (!savedUser) userCreatedOrUpdated = await createUser(ctx, { idFacebook, firstName, lastName });

    if (userCreatedOrUpdated.error) ctx.throw(500, userCreatedOrUpdated.error.message);

    const paramsToGetToken = { id: userCreatedOrUpdated._id };
    const token = signToken(paramsToGetToken);
    ctx.response.set(getHeaders());
    ctx.session = getSession(userCreatedOrUpdated);
    ctx.body = {
        success: true,
        id: userCreatedOrUpdated._id,
        msg: successMessage,
        token
    };
};

