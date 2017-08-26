var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var mongoose = require('mongoose');
var Discussion = require('../models/Discussion.model.js');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/User.model.js');



router.get('/',  function(req, res){
    console.log('getting all discs');
    Discussion.find({})
        .exec(function(err, discussions){
            if(err) {
                res.send('error has occured')
            } else {
                res.json(discussions);
            }
        });
});

router.get('/:id', ensureAuthenticated,  function(req, res){
    console.log('getting one disc');
    Discussion.findOne({
        _id: req.params.id
    }).exec(function(err, discussion){
        res.render('discussion', {"name": discussion.name, "username": req.user.name});

    });
});

router.post('/', function(req, res){
    Discussion.create(req.body, function(err,discussion){
        if(err){
            res.send('error saving discussion');

        } else {
            res.send(discussion);
        }
    });
});




router.delete('/:id', function(req,res){
    Discussion.findOneAndRemove({
        _id: req.params.id
    }, function(err, discussion){
        if(err) {
            res.send('error deleting');
        } else {
                res.status(204);
        }
    })
})

function ensureAuthenticated(req, res, next){
    if(req.isAuthenticated()){
        return next();
    } else {
        //req.flash('error_msg','You are not logged in');
        res.redirect('/user/login');
    }
}




module.exports = router;