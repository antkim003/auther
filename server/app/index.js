'use strict'; 

var app = require('express')();
var path = require('path');
var User = require('../api/users/user.model');

app.use(require('./logging.middleware'));
app.use(require('./session.middleware'));
app.use(require('./passport.middleware'))
app.use(require('./requestState.middleware'));

app.use(require('./statics.middleware'));



// make sure this comes after the session middleware, otherwise req.session will not be available
app.post('/login', function (req, res, next) {
    User.findOne({
        email: req.body.email,
        password: req.body.password
    })
    .exec()
    .then(function (user) {
        console.log('heres the login user');
        if (!user) {
            res.sendStatus(401);
            // res.redirect('/error');
        } else {
            req.session.userId = user._id;
            res.json(user);
            // res.redirect('/stories');
        }
    })
    .then(null, next);
});

// log out here
app.get('/logout', function(req,res,next) {
  console.log('logout reqsession: ', req.session);
  if (!req.session.userId) {
    next();
  } else {
    req.session.userId = null;
    res.sendStatus(200);
  }
});

app.get('/auth/me', function(req, res, next) {
    if (req.session.userId) {
        User.findById(req.session.userId)
            .then(function(user) {
                res.json(user);
            });
    } else {
        res.sendStatus(204);
    }
});


app.use('/api', require('../api/api.router'));

var validFrontendRoutes = ['/', '/stories', '/users', '/stories/:id', '/users/:id', '/signup', '/login'];
var indexPath = path.join(__dirname, '..', '..', 'public', 'index.html');
validFrontendRoutes.forEach(function (stateRoute) {
	app.get(stateRoute, function (req, res) {
		res.sendFile(indexPath);
	});
});

app.use(require('./error.middleware'));

module.exports = app;