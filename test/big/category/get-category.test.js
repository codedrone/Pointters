const assert = require('assert');

const { create: createCategory, delete: deleteCategody } = require('../../../stores/category');
const {pagination:{categories:limit}} = require('../../../config');

describe('User categorys', () => {
    describe('SUCCESS', () => {
        it('/request/category GET sohuld create a request given', async() => {
            const categoryCreated = await createCategory({
                category: {
                    type: 'Object'
                },
                keywords: [ 'string' ],
                name: 'name get',
                userId: __user._id
            });
            console.log('categoryCreated ', categoryCreated);
            const { body: res } = await agent
                .get(`/category/${categoryCreated._id}`)
                .expect(200);
            console.log('res  =', res);
            assert(typeof res.category === 'object');
        });

        it('/categorys GET all request saved with pagination', async() => {
            for (let i = 0; i <= limit; i++) await createCategory({
                keywords: [ 'string' ],
                name: `name ${i}`,
                userId: __user._id
            });

            const { body: {categories:res, next} } = await agent.get('/categories')
                .expect(200);
            console.log('res.length ', res);
            assert(res.length === limit);
            assert(next);

            const { body: { categories: resSecond, next:nextSecond } } = await agent.get(next)
                .expect(200);
            assert(resSecond.length === 2);
            assert(!nextSecond);
        });
    });

    describe('FAIL', () => {

    });

    after(() => deleteCategody({}));
});
