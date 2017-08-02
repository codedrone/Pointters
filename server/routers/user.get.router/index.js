const { getuser } = require('../../controllers/user');
const schema = require('./params-schema');
const validate = require('koa2-validation');
const Router = require('koa-router');
const router = new Router();

router.get('/user', validate({ params: schema }), getuser);

module.exports = router;
