var express =  require('express');
var router = express.Router();
var Book = require('../models/Book');
var passport = require('passport');
require('../config/passport')(passport);


router.post('/', passport.authenticate('jwt', {session: false}), function(req,res){
    var token = getToken(req.headers);
    if(token) {
        Book.create(req.body, function(err,data){
            if(err){
                return next();
            }
            res.json(data);
        })
    }
    else{
        return res.status(403).send({success: false, msg: 'unauthorised'})
    }
})

getToken = function(headers){
    if(headers && headers.authorization){
        var parted = headers.authorization.split(' ');
        if(parted.length == 2){
            return parted[1];
        }
        else{
            return null
        }
    }
    else{
        return null
    }
}

router.get('/',passport.authenticate('jwt', {session: false}), function(req,res){
    //console.log(req.headers.authorization)
    var token = getToken(req.headers);
    //console.log(token);
    if(token) {
        //console.log(token)
        Book.find(function(err, data){
            if(err){
                return next();
            }
            res.json(data);
        })        
    }
    else{
        return res.status(403).send({success: false, msg: 'unauthorised'})
    }
})



module.exports = router;