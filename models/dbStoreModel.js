'use-strict';

var mongoose         =   require('mongoose');
var bcrypt           =   require('bcryptjs');
const jwt            =   require('jsonwebtoken');

const config         =   require('../configuration/config');
const userSchema     =   require('../schema/dbSchema');
module.exports.registerUser=(req,res)=>{
  bcrypt.genSalt(10, (err, salt)=> {
    bcrypt.hash(req.body.password, salt, (err, hash)=> {
           req.body.password = hash;
           userSchema.User.create(req.body,(err)=>{
                   if(err)
                   res.json({'message':'user with this email is already available'});
                     else res.json({'message':'Registration successful...'});
              });     
        });
    });
}
 module.exports.login=(req,res)=>{
     var query={"email":req.body.email};
     userSchema.User.find(query,(err,user)=>{
           if(user.length>0){
                bcrypt.compare(req.body.password, user[0].password, (err, result)=> {
                     if (result==false) {
                        res.json({"message":"password incorrect"});
                      }else {
                         var datetime = new Date()
                         jwt.sign({user},datetime+1, { expiresIn: '12h' }, (err, token) => {
                         const product=new userSchema.userToken({
                            'token':token,
                            'loginTime':datetime+1,
                            'email':req.body.email
                         });
                        product.save();
                        res.json({"message":"Login successful","token":token})
                        });
                      }
                });
          }else res.json({"message":"User not registered"});
    });

}