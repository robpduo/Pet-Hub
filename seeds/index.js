const seedPets = require('./pet-seeds');
const sequelize = require('../config/connection');

const seedAll = async () => {
    await sequelize.sync({ force: true });
    
    await seedPets();

    process.exit(0);
};

seedAll();