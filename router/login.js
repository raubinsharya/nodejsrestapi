"use strict";

var router = require('express').Router(); 

var users  = require('../models/dbStoreModel');
var emails = require('../models/feedback');


router.get('/',(req,res)=>{
  res.render('home');
});

router.get('/:pagename',(req,res)=>{
  res.render(req.params.pagename);
});

router.post('/register',function(req,res){   

    var email       = req.body.email;
    var username    = req.body.username;
    var fullname    = req.body.fullname;
    var password    = req.body.password;
    var password2   = req.body.password2;

    // Validation
    req.checkBody('email'    ,  'Email is required') .notEmpty();
    req.checkBody('email'    ,  'Email is not valid').isEmail();
    req.checkBody('username' ,  'Username is required').notEmpty();
    req.checkBody('password' ,  'Password is required').notEmpty();
    req.checkBody('password' ,  'Passwords do not matched').equals(password2);
    req.checkBody('password' ,  'Password length should be 8-30 character').notEmpty().len(8,30);
//  req.checkBody('dob','D.O.B must be Date').notEmpty().isDate();
    var errors = req.validationErrors();
      if (errors) {
        res.send(errors[0]);                             //sending json out of array error
      }else
      users.registerUser(req.body,function(data){
      res.send(data);                                   //sending json status
  });
});

router.post('/login',function(req,res){
    var email = req.body.email;
    var password = req.body.password;
    // Validation
    req.checkBody('email'    , 'Email is required').notEmpty();
    req.checkBody('email'    , 'Email is not valid').isEmail();
    req.checkBody('password' , 'Password is required').notEmpty();
    req.checkBody('password' , 'Password length should be 8-30 character').notEmpty().len(8,30);
  
    //  req.checkBody('dob','D.O.B must be Date').notEmpty().isDate();
    var errors = req.validationErrors();
        if (errors) {
          res.send(errors[0]);                             //sending json out of array error
        }else{
          users.login(req.body,function(value){
              res.send(value);
          });
        }
   });
   
   router.post('/send',(req,res)=>{
     emails.sendEmail(req,res);
   });


module.exports=router;
  




