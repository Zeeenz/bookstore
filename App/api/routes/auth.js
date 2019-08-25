
var settings = require('../config/settings');
var express = require('express');
var jwt = require('jsonwebtoken');
var Router = express.Router();
var User = require('../models/User');



Router.post('/register', function(req,res){
    if(!req.body.username || !req.body.password){
        res.json({success: false,
                    message: 'Please pass Username and Password'})
    }
    else{
        var  newUser = new User({
            username: req.body.username,
            password: req.body.password
        })

        newUser.save(function(err){
            if(err){
                return res.json({success: false, message: "Username already exists"})
            }
            res.json({success: true, message: "User is created successfully"})
        })
    }
})

Router.post('/login', function(req,res){
    User.findOne({
        username: req.body.username
    }, function(err,user){
        if(err){
            throw err;
        }
        if(!user){
            res.status(401).send({success: false, message: "User not found"});
        }
        else{
            user.confirmPassword(req.body.password, function(err, isMatch){
                if(isMatch && !err){
                    //console.log(jwt.sign(user.toJSON(),settings.secret));
                    var token = jwt.sign(user.toJSON(),settings.secret);
                    token = `jwt ${token}`;
                    res.status(200).send({success: true ,token})
                }
                else{
                    res.status(401).send({success: false, message: "Wrong Password"})
                }
            })
        }
    })
})

module.exports = Router;