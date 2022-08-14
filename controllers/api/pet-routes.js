const router = require('express').Router();
const { Pet, User } = require('../../models');
const sequelize = require('../../config/connection');
const withAuth = require('../../utils/auth');

//image upload
const multer = require('multer');
const path = require('path');

//upload image
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'avatars');
    },
    filename: (req, file, cb) => {
        cb(null,Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 1024 * 1023 *5 },
    fileFilter: (req, file, cb) => {
        const fileTypes = /jpg|jpeg|png|gif/;
        const mimeType = fileTypes.test(file.mimetype);
        const extname = fileTypes.test(path.extname(file.originalname));

        if(mimeType && extname){
            return cb(null, true);        
        }
        cb('Give proper files format to upload jpg|jpeg|png|gif');
    }
});

// retrieve all pets
router.get('/', (req, res) => {
    Pet.findAll({
        attributes: [
            'id',
            'name',
            'pet_type',
            'gender',
            'age',
            'picture_url'
        ],
        include: [
            {
                model: User,
                attributes: ['username','city']
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
            'pet_type',
            'age',
            'bread'
        ],
        include: [
            {
                model: User,
                attributes: ['username','city']
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
router.post('/', withAuth, upload.single('picture_url'), (req, res) => {
    Pet.create(
        {
            name: req.body.name,
            picture_url: req.file.path,
            age: req.body.age,
            pet_type: req.body.pet_type,
            gender: req.body.gender,
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
            pet_type: req.body.pet_type,
            age: req.body.age,
            gender: req.body.gender,
            
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