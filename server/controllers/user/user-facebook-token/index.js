const { findOne } = require('../../../../stores/user');
const signToken = require('../../../lib/sign-token');
const getHeaders = require('../../../lib/get-headers');
const getSession = require('../../../lib/get-session');
const validateFacebookToken = require('../../../../services/validate-token-facebook');
const createUser = require('./create-user');

const successMessage = 'Successful created a new user.';
module.exports = async(ctx) => {
    const { name, id: idFacebook, error } = await validateFacebookToken(ctx.request.body.token);

    if (error) return ctx.throw(403, 'Token not Valid');

    const savedUser = await findOne({ email: ctx.request.body.email });
    let userCreatedOrUpdated = savedUser;
    const [ firstName, lastName ] = name.split(' ');
    if (!savedUser) userCreatedOrUpdated = await createUser(ctx, { idFacebook, firstName, lastName });
    const paramsToGetToken = { id: userCreatedOrUpdated._id, email: userCreatedOrUpdated.email };
    const token = signToken(paramsToGetToken);
    ctx.response.set(getHeaders());
    ctx.session = getSession(userCreatedOrUpdated);
    ctx.body = { success: true, id: userCreatedOrUpdated._id, msg: successMessage, token: token };
};

