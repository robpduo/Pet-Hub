const router = require('express').Router();
//adding models and sequelize
const sequelize = require('../config/connection');
const { User, Pet } = require('../models');
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
            //serialize data before passing to template
            const posts = dbPostData.map(post => post.get({ plain: true }));
            res.render('dashboard', { 
                posts,
                city: posts[0].user.city,
                userId: req.session.user_id,
                loggedIn: true, 
                image: req.session.image,
                username: req.session.username,
                user_id: req.session.user_id
             });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        })
});


router.get('/edit/:id', withAuth, (req, res) => {
    Pet.findByPk(req.params.id, {
        where: {
            user_id: req.session.user_id
        },
        attributes: [
            'id',
            'name',
            'picture_url',
            'age',
            'pet_type'
        ]
    })
        .then(dbPostData => {
            if (dbPostData) {
                const petCard = dbPostData.get({ plain: true });
                
                res.render('edit-pet', {
                    petCard,
                    city: dbPostData.user.city,
                    userId: req.session.user_id,
                    loggedIn: true,
                    image: "../../"+req.session.image,
                    username: req.session.username
                });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        })
})

module.exports = router;