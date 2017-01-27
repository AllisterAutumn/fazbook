var express = require('express');
var router = express.Router();
var models = require('../server/models/index');

//This page is where all the action takes place and were all the get and post functions are called from
//because the users page is the 'interior' of fazbook that the user sees after the landiing page.

/* GET users listing. */
//This is the home page and it displays the information onto the page
router.get('/', function(req, res, next) {
    models.User.findAll({}).then(function(users) {
        res.render('users/index', {
            title: 'fazbook',
            users: users
        });
    });
});

router.get('/', function(req, res, next) {
    res.render('users/index', { title: 'fazbook' });
});

//This is to allow users to create new accounts. It leads to a form that will take information and add them to a databse

router.get('/new', function(req, res, next) {
    res.render('users/new', { title: 'make an account' });
});
//This takes in the information from the form and posts it to the databse created with sequelize
router.post('/', function(req, res, next) {
    models.User.create({
        firstName: req.body.firstName,
        lastName: email: dob: req.body.lastname,
        email: req.body.email,
        dob: req.body.dob
    }).then(function() {
        res.redirect('/users')
    })
});

//This function deletes the user from the page and the databse
router.delete('/:id', function(req, res, next) {
    models.User.destroy({
        where: { id: req.params.id }
    }).then(function(user) {
        res.redirect('/users')
    })
});

router.get('/:id', function(req, res, next) {
    models.User.findById(req.params.id).then(function(user) {
        res.render('users/show', { user: user });
    });
});

//This will edit information on the database. It will link to a separate page with a form
//where the data can be changed
router.get('/:id/edit', function(req, res, next) {
    models.User.findById(req.params.id).then(function(user) {
        res.render('users/edit', { user: user });
    });
});

router.put('/:id', function(req, res, next) {
    models.User.update({
        email: req.body.email,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        dob: req.body.dob
    }, { where: { id: req.params.id } }).then(function() {
        res.redirect('/users/' + req.params.id);
    });
});

module.exports = router;
