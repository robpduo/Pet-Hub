// import all models
const User = require('./User');

const Pet = require('./Pets');

//create associations
User.hasMany(Pet, {
    foreignKey: 'user_id'
});

Pet.belongsTo(User, {
    foreignKey: 'user_id'
})


module.exports = { User, Pet };

