const router = require('express').Router();
const { Pet, User } = require('../../models');

// retrieve all pets
router.get('/', (req, res) => {
    Pet.findAll({
        attributes: [
            'id',
            'name',
            'gender',
            'age',
            'bread',
            'picture_url'
        ],
        include: [
            {
                modle: User,
                attributes: ['id', 'username', 'email']
            }
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
        include: [
            {
                modle: User,
                attributes: ['id', 'username', 'email']
            }
        ],
        where: {
            id: req.params.id
        }
    })
        .then(dbPetData => {
            if (!dbPetData) {
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

// create a new pet, under the current user session
router.post('/', (req, res) => {
    Pet.create(
        {
            name: req.body.name,
            picture_url: req.body.picture_url,
            age: req.body.age,
            gender: req.body.gender,
            bread: req.body.bread,
            user_id: req.session.user_id // user id taken from user session
        }
    )
        .then(dbPetData => res.json(dbPetData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.put('/:id', (req, res) => {
    Pet.update(
        {
            name: req.body.name,
            picture_url: req.body.picture_url,
            age: req.body.age,
            gender: req.body.gender,
            bread: req.body.bread,
        }
    )
    .then(dbPetData => {
        if(!dbPetData) {
            res.status(404).json({ message: 'No pets found with this id!'});
            return;
        }

        res.json(dbPetData)
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.delete('/:id', (req, res) => {
    Pet.destroy(
        {
            where: {
                id: req.params.id
            }
        }
    )
    .then(dbPetData => {
        if(!dbPetData) {
            res.status(404).json({ message: 'No pet found with this id!'});
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