const {findOne} = require('../../stores/user');

module.exports = (req, res, next) => {
    const userId = req.params.id;
    console.log(userId);

    findOne({_id: userId})
    .then((user) => {
        if (!user) return res.status(404).send('No User found');
        res.status(200).json({email:user.email});
    })
    .catch(next);
};
