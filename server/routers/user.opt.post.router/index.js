const { userOpt } = require('../../controllers/user');
const schema = require('./body-schema');
const validate = require('koa2-validation');
const Router = require('koa-router');
const router = new Router();

router.post('/user/opt', validate({ body: schema }), userOpt);

module.exports = router;
