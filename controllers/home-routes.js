const router = require('express').Router();
//adding models and sequelize
const sequelize = require('../config/connection');
const { User, Pet } = require('../models');
const withAuth = require('../utils/auth');

//send response using render to use a template engine
router.get('/', (req, res) => {
    Pet.findAll({
        attributes: [
            'id',
            'name',
            'picture_url',
            'age',
            'pet_type'
        ],
        include: [
            {
                model: User,
                attributes: ['username', 'city']
            }
        ]
    })
        .then(dbPostData => {
            //serialize the object down to only the properties you need .get({ plain: true}))
            const posts = dbPostData.map(post => post.get({ plain: true }));
            console.log(posts);
            res.render('homepage', {
                posts,
                userId: req.session.user_id,
                loggedIn: req.session.loggedIn,
                image: req.session.image
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

//login route
router.get('/login', (req, res) => {
    //if login redirect to a specific page
    if (req.session.loggedIn) {
        res.redirect('/dashboard', {
            image: req.session.image
        });
        return;
    }
    res.render('login');
});

router.get('/signup', (req, res) => {
    //if login redirect to a specific page
    if (req.session.loggedIn) {
        res.redirect('/dashboard', {
            image: req.session.image
        });;
        return;
    }
    res.render('signup');
});

//login route
router.get('/pets', (req, res) => {
    //if login redirect to a specific page
    if (!req.session.loggedIn) {
        res.redirect('/login')
        return;
    }
    res.render('pets-create', {
        loggedIn: req.session.loggedIn,
        image: req.session.image
    });
});

router.get('/edit/:id', withAuth, (req, res) => {
    User.findByPk(req.params.id, {
        where: {
            user_id: req.session.user_id
        },
        attributes: [
            'id',
            'username',
            'email',
            'password',
            'city',
            'image'
        ]
    })
        .then(dbUserData => {
            if (dbUserData) {
                const userData = dbUserData.get({ plain: true });

                res.render('edit-user', {
                    userData,
                    loggedIn: true,
                    image: req.session.image,
                    username: req.session.username
                })
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        })
})

module.exports = router;