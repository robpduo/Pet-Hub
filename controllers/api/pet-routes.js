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
            'bread'
        ]
    })
        .then(dbPetData => res.json(dbPetData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.get('/:id', (req, res) => {
    Pet.findOne({
        attributes: [
            'id',
            'name',
            'gender',
            'age',
            'bread'
        ],
        where: {
            id: req.params.id
        }
    })
        .then(dbPetData => {
            if(!dbPetData) {
                res.status(404).json({ message: 'No pet found with this id' });
                return;
            }
            res.json(dbPetData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;