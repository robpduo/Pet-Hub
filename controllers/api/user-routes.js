const router = require('express').Router();
const { User, Pet } = require('../../models');
const { upload, storage } = require('../../config/upload')



//Post /api/users/test
router.post('/', upload.single('image'), (req, res) => {
    User.create({
        username:req.body.username,
        email: req.body.email,
        password: req.body.password,
        city: req.body.city,
        image: req.file.path
    })
        //This gives our server easy access to the user's user_id, username, and a Boolean describing whether or not the user is logged in.
        .then(dbUserData => {
            req.session.save(() => {
                req.session.user_id = dbUserData.id;
                req.session.username = dbUserData.username;
                req.session.loggedIn = true;
                req.session.image = dbUserData.image;;
          
                res.json(dbUserData);
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});


//Get /api/users
router.get('/', (req, res) => {
    User.findAll({
        //exclude password info from get requests
        attributes: { exclude: ['password']}
    })
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

//Get /api/users/1
router.get('/:id', (req, res) => {
    User.findOne({
        attributes: {exclude: ['password']},
        where: {
            id: req.params.id
        }
    }).then(dbUserData => {
        if(!dbUserData){
            res.status(404).json({message: 'No user found whit this id'});
            return;
        }
        res.json(dbUserData);
    }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});


//PUT (update) /api/users/1
router.put('/:id', upload.single('image'), (req, res) => {
    User.update({
        username:req.body.username,
        email: req.body.email,
        password: req.body.password,
        city: req.body.city,
        image: req.file.path
    },
    {
        //adding bcrypt hook to hash password when updated
        individualHooks: true,
        where: {
            id: req.params.id
        }
    })
        .then(dbUserData => {
            if(!dbUserData[0]) {
                res.status(404).json({message: 'No user found with this id' });
                return;
            }
            res.json(dbUserData);
        }).catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

//DELETE /api/users/1
router.delete('/:id',  (req, res) => {
    User.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(dbUserData => {
            if(!dbUserData){
                res.status(404).json({message: 'No user found with this id'});
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

//POST login route
router.post('/login',  (req, res) => {
    User.findOne({
        where: {
            email: req.body.email
        }
    }).then(dbUserData => {
        if (!dbUserData){
            res.status(400).json({message: 'No user with that email address!'});
            return;
        }
        //verify User 
        const validPassword = dbUserData.checkPassword(req.body.password);
        if (!validPassword) {
            res.status(400).json({ message: 'Incorrect password!'});
            return;
        }
        //This gives our server easy access to logged in info
        req.session.save(() => {
            // declare session variables
            req.session.user_id = dbUserData.id;
            req.session.username = dbUserData.username;
            req.session.loggedIn = true;
            req.session.image = dbUserData.image;;

            res.json({ user: dbUserData, message: 'You are now logged in!' });
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

//add logout route
router.post('/logout',  (req,res) => {
    if (req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    }
    else {
        res.status(404).end();
    }
});


module.exports = router;