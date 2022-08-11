const router = require('express').Router();
const { Pet } = require('../../models');

// retrieve all pets
router.get('/', (req, res) => {
    Pet.findAll({
        attributes: [
            'id',
            'name',
            'gender',
            'age',
        ]
    })
        .then(dbPetData => res.json(dbPetData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;