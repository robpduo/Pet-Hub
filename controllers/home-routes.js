const router = require('express').Router();
//adding models and sequelize
const sequelize = require('../config/connection');
const { User } = require('../models');
const { route } = require('./api');

//send response using render to use a template engine
router.get('/', (req, res) => {
    console.log(req.session)
    User.findAll({
      attributes: [
        'id',
        'username',
        'email',
        'city',
        'image'
      ]
    })
      .then(dbPostData => {
        //serialize the object down to only the properties you need .get({ plain: true}))
        const posts = dbPostData.map(post => post.get({plain: true})); 
        res.render('homepage', {
            posts,
            loggedIn: req.session.loggedIn
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
        res.redirect('/dashboard');
        return;
    }
    res.render('login');
});

router.get('/signup', (req, res) => {
    //if login redirect to a specific page
    if (req.session.loggedIn) {
        res.redirect('/dashboard');
        return;
    }
    res.render('signup');
});

module.exports = router;