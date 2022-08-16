const router = require('express').Router();
//adding models and sequelize
const sequelize = require('../config/connection');
const { User , Pet} = require('../models');
const { route } = require('./api');
const withAuth = require('../utils/auth');

//send response using render to use a template engine
//GET route
router.get('/', withAuth, (req, res) => {
    Pet.findAll({
        where: {
            //use the id from the session
            user_id: req.session.user_id
        },
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
            //serialize data before passing to template
            const posts = dbPostData.map(post => post.get({ plain: true}));
            res.render('dashboard', { posts, loggedIn: true });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        })
    
});


module.exports = router;