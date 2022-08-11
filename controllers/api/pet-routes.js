const router = require('express').Router();
const { Pet } = require('../../models');

router.get('/', (req, res) => {
    Pet.findAll({
        attributes: [
            'id',
            'name',
            'gender',
            'age',
            'created_at'
        ]
    })
        .then(dbPetData => res.json(dbPetData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;