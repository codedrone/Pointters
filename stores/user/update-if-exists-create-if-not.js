
module.exports = (client) => async(query, data) => {
    console.log('query ', query);
    console.log('data ', data);
    try {
        let user = await client.findOne(query);

        if (!user) user = await client.create(data);

        user = user.toObject();
        user._id = user._id.toString();
        return await Promise.resolve(user);
    } catch (error) {
        return await Promise.resolve({error});
    }
};
