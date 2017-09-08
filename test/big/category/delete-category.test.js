const assert = require('assert');

const { create: createCategory, delete: deleteCategody, findOne: findOneCategory } = require('../../../stores/category');


describe('User requests', () => {
    describe('SUCCESS', () => {
        it('/category/:idCategory DELETE sohuld create a request given', async () => {
            const category = {
                userId: __user._id,
                keywords: [ 'string' ],
                name: 'name delete'
            };
            const categoryCreated = await createCategory(category);
            console.log('category ====: ', categoryCreated);
            await agent.delete(`/category/${categoryCreated._id}`)
                .set(authorizationHeader)
                .set(Cookie)
                .expect(200);
            const categoryNotActive = findOneCategory({ _id: categoryCreated._id });
            assert(!categoryNotActive.isActive);
        });
    });

    describe('FAIL', () => {

    });

    after(() => deleteCategody({}));
});
