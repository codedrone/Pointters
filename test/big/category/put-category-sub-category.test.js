const assert = require('assert');

const {delete: deleteCategody, create: createCategory, findOne: findOneCategory } = require('../../../stores/category');


describe('User requests', () => {
    describe('SUCCESS', () => {
        it('/category/:idCategory PUT sohuld create a request given', async() => {
            const body = {
                keywords: [ 'string' ],
                name: 'name put',
                subCategories:[ {
                    keywords: [ 'string' ],
                    name: 'name post'
                } ],
                userId: __user._id
            };
            const update = {
                name: 'name put 2 sub'
            };
            const categoryCreated = await createCategory(body);
            await agent.put(`/category/${categoryCreated._id}/sub-category/${categoryCreated.subCategories[0]._id}`)
                .send(update)
                .set(authorizationHeader)
                .set(Cookie)
                .expect(200);
            const updated = await findOneCategory({_id:categoryCreated._id});
            assert.deepStrictEqual(updated.subCategories[0].name, update.name);
        });
    });

    describe('FAIL', () => {});

    after(() => deleteCategody({}));
});
