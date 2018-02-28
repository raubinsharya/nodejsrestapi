'use-strict';

const jwt           =   require('jsonwebtoken');
const mongoose      =   require('mongoose');
const tokenSchema   =   require('../schema/tokenSchema');

module.exports.verifyToken=function(req, res, next) {
  // Get auth header value
  const bearerHeader = req.headers['authorization'];
  // Check if bearer is undefined
  if(typeof bearerHeader !== 'undefined') {
    // Split at the space
    const bearer = bearerHeader.split(' ');
    // Get token from array
    const bearerToken = bearer[1];
    // Set the token
    req.token = bearerToken;
    // Next middleware
    next();
  } else {
    // Forbidden
     res.status(401);
     res.json({'status':'un-authenticated access'});
  }

}

module.exports.getToken=function(req, res, next) {
  const query={'token':req.token};
  tokenSchema.userToken.find(query,function(err,tokenData){
     if(tokenData.length>0){
          req.extras=tokenData[0].secretkey;
          req.user=tokenData[0].email;
          next();
      }
      else{ 
          req.extras='undefined'
          next();
      }
  });
}

