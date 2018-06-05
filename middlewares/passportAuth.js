var passport = require('passport');
var passportJWT = require('passport-jwt');
var User = require('../models/User');

var JwtStrategy = passportJWT.Strategy;
var ExtractJwt = passportJWT.ExtractJwt;

var strategyOptions = {
    'secretOrKey': process.env.JWT_SECRET,
    'jwtFromRequest': ExtractJwt.fromAuthHeaderAsBearerToken()
};

var jwtConfig = {
    'session': false,
    'failWithError': true 
};

module.exports = function() {
    var strategy = new JwtStrategy(strategyOptions, function(payload,done) {
        User.findById(payload._id, { 'password': false }, function(err, user) {
            if (err) {
                return done(err,false);
            }
            if (!user) {
                return done(null,false);
            }
            else {
                return done(null,user);
            }
        });
    });

    passport.use(strategy);

    return {
        'initialize': function() {
            return passport.initialize();
        },
        'authenticate': function() {
            return passport.authenticate("jwt", jwtConfig);
        }
    }
}