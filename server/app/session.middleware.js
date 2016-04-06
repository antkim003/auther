'use strict';

var router = require('express').Router();
var session = require('express-session');

router.use(session({
    // this mandatory configuration ensures that session IDs are not predictable
    secret: 'tongiscool' // or whatever you like
}));

router.use(function (req, res, next) {
  if (!req.session.counter) req.session.counter = 0;
  console.log('counter', ++req.session.counter);
  next();
});

router.use(function(req,res,next) {
  console.log(req.session);
  next();
});

module.exports = router;
