const router = require('express').Router();
//adding models and sequelize
const sequelize = require('../config/connection');
const { User} = require('../models');
const { route } = require('./api');

//send response using render to use a template engine
router.get('/', (req, res) => {
    console.log(req.session)
    User.findAll({
      attributes: [
        'id',
        'username',
        'email'
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

module.exports = router;