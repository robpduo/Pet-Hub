const router = require('express').Router();
//adding models and sequelize
const sequelize = require('../config/connection');
const { User , Pet} = require('../models');
const { route } = require('./api');

//send response using render to use a template engine
router.get('/', (req, res) => {
    Pet.findAll({
        attributes: [
            'name',
            'picture_url',
            'age',
            'pet_type'
        ],
        include:[
            {
                model: User,
                attributes: ['username','city']
            }
        ]
    })
      .then(dbPostData => {
        //serialize the object down to only the properties you need .get({ plain: true}))
        const posts = dbPostData.map(post => post.get({plain: true})); 
        console.log(req.session.image)
        res.render('homepage', {
            posts,
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
        res.redirect('/dashboard',{
            image: req.session.image
        });
        return;
    }
    res.render('login');
});

router.get('/signup', (req, res) => {
    //if login redirect to a specific page
    if (req.session.loggedIn) {
        res.redirect('/dashboard',{
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

module.exports = router;