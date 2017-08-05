module.exports = (client) => async(query, data) => client
    .update(query, { $set: data }, { upsert: true, new: true })
    .then((updatedOrCreated) => updatedOrCreated.map((item) => item.toObject()))
    .then((updatedOrCreated) => updatedOrCreated.map((item) => {
        if (item._id) item._id = item._id.toString();
        return item;
    }));
