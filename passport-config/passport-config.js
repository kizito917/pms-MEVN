const passport-jwt = require('passport-jwt');
const Strategy = pp-jwt.Strategy;
const ExtractJwt = pp-jwt.ExtractJwt;

const secret = process.env.SECRET || 'pmsbackend';
const mongoose = require('mongoose');

const User = require('./models/user');

const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: secret
};

module.exports = passport => {
    passport.use(
        new Strategy(opts, (payload, done) => {
             User.findById(payload.id)
                 .then(user => {
                     if(user){
                       return done(null, {
                           id: user.id,
                           name: user.name,
                           email: user.email,
                       });
                     }
                     return done(null, false);
                  }).catch(err => console.error(err));
              });
           );
     };