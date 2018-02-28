'use-strict';

var mongoose         =   require('mongoose');
var bcrypt           =   require('bcryptjs');
const jwt            =   require('jsonwebtoken');

const config         =   require('../configuration/config');
const userSchema     =   require('../schema/dbSchema');
const tokensData     =   require('../models/saveToken');
const tokenSchema    =   require('../schema/tokenSchema');

module.exports.registerUser=function(users,callback){
        search(users,function(value){
          if(value==0){
            bcrypt.genSalt(10, function(err, salt) {
               bcrypt.hash(users.password, salt, function(err, hash) {
                 users.password = hash;
                 userSchema.User.create(users);
                 callback({"status":"Registration successful"});
                });
            });
       }else
         callback({"status":"User already registered"});
  });
};
var search=function(value,callback){
            var emailQuery      = {"email":value.email};
            //var usernameQuery   = {"userName":value.username};
            userSchema.User.find(emailQuery, function(err, user) {
            if(user.length>0){
              callback(1);
          }else
            callback(0);
        });
};
 module.exports.login=function(userData,callback){
  var query={"email":userData.email};
    userSchema.User.find(query,function(err,user){
           if(user.length>0){
                bcrypt.compare(userData.password, user[0].password, function(err, res) {
                     if (res==false) {
                        callback({"status":"password incorrect"});
                      }else {
                         var datetime = new Date()
                         jwt.sign({user},datetime+1, { expiresIn: '12h' }, (err, token) => {
                         const product=new tokenSchema.userToken({
                            'token':token,
                            'secretkey':datetime+1,
                            'email':userData.email
                         });
                        product.save();
                        callback({"status":"Login successful","token":token})
                        });
                      }
                });
          }else callback({"status":"User not registered"});
    });

}