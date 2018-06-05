var express = require('express');
var router = express.Router();
var User = require('../models/User');

/* GET request at api */
router.get('/', function(req, res, next) {
    return res.status(200).json({
        'response': "validation successful",
        'username': req.user.username,
        '_id': req.user._id
    });
});

router.get('/users', function(req, res, next) {
    User.find({},{ 'password':false, '_id': false },function(err,users){
        if (err) {
            return res.status(500).json({
                'response': "error processing request (db-find)"
            });
        }
        else {
            return res.status(200).json({
                'response': "successfully fetched users",
                'users': users
            });
        }
    });
});

module.exports = router;
