var app = require('express').Router();
var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var User = require('../api/users/user.model');

app.use(passport.initialize());
app.use(passport.session());

// Google authentication and login 
app.get('/auth/google', passport.authenticate('google', { scope : 'email' }));

// handle the callback after Google has authenticated the user
app.get('/auth/google/callback',
  passport.authenticate('google', {
    successRedirect : '/', // or wherever
    failureRedirect : '/' // or wherever
  })
);

// don't forget to install passport-google-oauth

passport.use(
  new GoogleStrategy({
    clientID: '676131619441-e030a6ajdqdkr8e06ko1e8geps476q6v.apps.googleusercontent.com',
    clientSecret: 'ogQ91FtUJqfWvNuWC6sgJfZf',
    callbackURL: 'http://127.0.0.1:8080/auth/google/callback'
  },
  // Google will send back the token and profile
  function (token, refreshToken, profile, done) {
    // the callback will pass back user profile information and each service (Facebook, Twitter, and Google) will pass it back a different way. Passport standardizes the information that comes back in its profile object.
    /*
    --- fill this part in ---
    */
    // User.findOne({ 'google.id': profile.id }).
    //   then(function(user) {
    //     if (user) {
    //       return done(null, user);
    //     } else {
    //       var newUser = new User({
    //         google: {
    //           id: profile.id,
    //           name: profile.displayName,
    //           email: profile.emails[0].value,
    //           token: token
    //         },
    //         email: profile.emails[0].value,
    //         name: profile.displayName
    //       });
    //       console.log('new User created!', newUser);
    //       return newUser.save();
    //     }
    //   })
    //   .then(function(_newUser) {
    //     console.log('it saved here!', _newUser);
    //     done(null,newUser);
    //   })
    //   .catch(function(err) {
    //     return done(err);
    //   })

    User.findOne({ 'google.id' : profile.id }, function (err, user) {
        // if there is an error, stop everything and return that
        // ie an error connecting to the database
        if (err) return done(err);
        // if the user is found, then log them in
        if (user) {
          return done(null, user); // user found, pass along that user
        } else {
          // if there is no user found with that google id, create them
          var newUser = new User();
          // set all of the Google information in our user model
          newUser.google.id = profile.id; // set the users google id                   
          newUser.google.token = token; // we will save the token that google provides to the user                    
          newUser.google.name = profile.displayName; // look at the passport user profile to see how names are returned
          newUser.google.email = profile.emails[0].value; // Google can return multiple emails so we'll take the first
          // don't forget to include the user's email, name, and photo
          newUser.email = newUser.google.email; // required field
          newUser.name = newUser.google.name; // nice to have
          newUser.photo = profile.photos[0].value; // nice to have
          // save our user to the database
          newUser.save(function (err) {
            if (err) done(err);
            // if successful, pass along the new user
            else done(null, newUser);
          });
        }
    });
  })
);
passport.serializeUser(function(user,done) {
  done(null, user._id);
});

passport.deserializeUser(function(id,done) {
  User.findById(id, done);
});

module.exports = app;