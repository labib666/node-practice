var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');
var User = require('../models/User');
var jwtToken = require('jsonwebtoken');
var validator = require('../middlewares/credentialValidator')();

/* POST request for login */
router.post('/', function(req, res, next) {
    var username = req.body.username;
    var password = req.body.password;
    
    if (!validator.validateUsername(username)) {
        return res.status(400).json({
            'response': "invalid username"
        });
    };
    if (!validator.validatePassword(password)) {
        return res.status(400).json({
            'response': "invalid password"
        });
    };

    User.findOne({ 'username': username }, function(err,user) {
        if (err) {
            return res.status(500).json({
                'response': "error processing request (db-find)"
            });
        }
        if (!user) {
            return res.status(400).json({
                'response': "user does not exist"
            });
        }
        else {
            if (!bcrypt.compareSync(password,user.password)) {
                return res.status(400).json({
                    'response': "password does not match"
                });
            }
            else {
                var token = jwtToken.sign({
                    '_id': user._id
                }, process.env.JWT_SECRET);
                return res.status(200).json({
                    'response': "login successful",
                    'username': user.username,
                    '_id': user._id,
                    'token': token
                });
            }
        }
    });
    
});

module.exports = router;
