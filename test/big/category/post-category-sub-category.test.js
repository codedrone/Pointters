const assert = require('assert');

const {
    findOne: findOneCategory,
    delete: deleteCategody,
create: createCategory } = require('../../../stores/category');


describe('User requests', () => {
    describe('SUCCESS', () => {
        it('/category POST sohuld create a request given', async() => {
            const body = {
                keywords: [ 'string' ],
                name: 'name post',
                userId: __user._id
            };
            const categoryCreated = await createCategory(body);
            const subCategory = {
                keywords: [ 'string sub' ],
                name: 'sub name post',
            };
            await agent.post(`/category/${categoryCreated._id}/sub-category`)
                .send(subCategory)
                .set(authorizationHeader)
                .set(Cookie)
                .expect(200);
            const updated = await findOneCategory({_id:categoryCreated._id});
            assert.deepStrictEqual(updated.subCategories[0].keywords, subCategory.keywords);
            assert.equal(updated.subCategories[0].name, subCategory.name);
        });
    });

    describe('FAIL', () => {});

    after(() => deleteCategody({}));
});
