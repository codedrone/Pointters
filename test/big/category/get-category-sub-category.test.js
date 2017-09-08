const assert = require('assert');

const {delete: deleteCategody, create: createCategory} = require('../../../stores/category');


describe('User requests', () => {
    describe('SUCCESS', () => {
        it('/category/:idCategory GET sohuld create a request given', async() => {
            const body = {
                keywords: [ 'string' ],
                name: 'name put',
                subCategories:[ {
                    keywords: [ 'string' ],
                    name: 'name post'
                } ],
                userId: __user._id
            };
            const categoryCreated = await createCategory(body);
            const {body:{subCategories}} = await agent.get(`/category/${categoryCreated._id}/sub-category/${categoryCreated.subCategories[0]._id}`)
                .set(authorizationHeader)
                .set(Cookie)
                .expect(200);
            assert.deepStrictEqual(subCategories[0].keywords, body.subCategories[0].keywords);
            assert.equal(subCategories[0].name, body.subCategories[0].name);
        });
    });

    describe('FAIL', () => {});

    after(() => deleteCategody({}));
});
