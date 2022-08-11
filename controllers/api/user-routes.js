const router = require('express').Router();
const { User } = require('../../models');

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

//Post /api/users
router.post('/',  (req, res) => {
    User.create({
        username:req.body.username,
        email: req.body.email,
        password: req.body.password
    })
        //This gives our server easy access to the user's user_id, username, and a Boolean describing whether or not the user is logged in.
        .then(dbUserData => {
            req.session.save(() => {
                req.session.user_id = dbUserData.id;
                req.session.username = dbUserData.username;
                req.session.loggedIn = true;
          
                res.json(dbUserData);
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});


module.exports = router;