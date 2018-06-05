var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');
var User = require('../models/User');
var validator = require('../middlewares/credentialValidator')();

/* Post request for signup */
router.post('/', function(req, res, next) {
    var username = req.body.username;
    var email = req.body.email;

    if (!validator.validatePassword(req.body.password)) {
        return res.status(400).json({
            'response': "invalid password"
        });
    }
    var password = bcrypt.hashSync(req.body.password,10);

    if (!validator.validateUsername(username)) {
        return res.status(400).json({
            'response': "invalid username"
        });
    }
    if (!validator.validateEmail(email)) {
        return res.status(400).json({
            'response': "invalid email"
        });
    }
    

    User.findOne({ $or:[ {'username':username}, {'email':email} ] }, function(err, user) {
        if (err) {
            return res.status(500).json({
                'response': "error processing request (db-find)"
            });
        }
        if (user) {
            return res.status(400).json({
                'response': "user or email already exists"
            });
        }
        else {
            User.create({
                'username': username,
                'email': email,
                'password': password
            }, function(err, newUser) {
                if (err) {
                    return res.status(500).json({
                        'response': "error processing request (db-create)"
                    });
                }
                else {
                    return res.status(200).json({
                        'response': "signup successfully",
                        'username': newUser.username,
                        '_id': newUser._id
                    });
                }
            });
        }
    });
});

module.exports = router;
