const { getuser } = require('../../controllers/user');
const schema = require('./params-schema');
const validateId = require('../../lib/middelwares/validate-id');
const validate = require('koa2-validation');
const Router = require('koa-router');
const router = new Router();

router.get('/user/:id',
    validate({ params: schema }),
    (ctx, next) => validateId(ctx.params.id, ctx, next),
    getuser);

module.exports = router;
