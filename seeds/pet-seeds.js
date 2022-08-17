const { Pet } = require('../models');

const petsData = [
    {
        name: 'Toto',
        gender: 'M',
        bread: 'Morkie',
        age: 5,
    },
    {
        name: 'Taro',
        gender: 'M',
        bread: 'cat - iunno',
        age: 4
    },
    {
        name: 'Mumu',
        gender: 'F',
        bread: 'cat - iunno',
        age: 4
    }
];

const seedPets = () => Pet.bulkCreate(petsData);

module.exports = seedPets;