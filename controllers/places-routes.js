const router = require('express').Router();
const { User } = require('../models');
const withAuth = require('../utils/auth');


router.get("/", withAuth, (req, res) => {
    if (!req.session.loggedIn) {
        res.redirect('/login')
        return;
    }

    User.findAll({
        attributes: [
            'id',
            'city'
        ],
    })
        .then(dbUserData => {
            res.render("places", {
                dbUserData,
                userId: req.session.user_id,
                loggedIn: req.session.loggedIn,
                image: "../" + req.session.image
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.get("/:city", withAuth, (req, res) => {
    if (!req.session.loggedIn) {
        res.redirect('/login')
        return;
    }

    res.render("places", {
        city: req.params.city,
        userId: req.session.user_id,
        loggedIn: req.session.loggedIn,
        image: "../" + req.session.image
    });

});

module.exports = router;