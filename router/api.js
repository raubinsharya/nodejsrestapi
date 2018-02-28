"use strict";
const router        =   require('express').Router();
const jwt           =   require('jsonwebtoken');
const Jimp          =   require("jimp");

var uploads         =   require('../models/upload');
var config          =   require('../configuration/config');
var support         =   require('../models/support');
const tokenSchema   =   require('../schema/tokenSchema');
var loadedImage;

router.post('/upload',function(req, res) {  
         jwt.verify(req.token, req.extras, (err, authData) => {
        if(err) {
          res.json({'status':err});
        } else {
               uploads.upload(req,res);
          }
     }); 
     //uploads.upload(req,res,req);   
});

  router.get('/file/:filename', function(req,res){
      uploads.show(req.params.filename,res);
   });

router.post('/dashboard',(req,res)=>{
      jwt.verify(req.token,req.extras, (err, authData) => {
        if(err) {
          res.json({'status':'unauthenticated user'});
        } else {
          res.json({'status':'You are now authenticated','authData':authData});
            }
    });

   });
   router.post('/logout',(req,res)=>{
    jwt.verify(req.token,req.extras,(err, authData) => {
      if(err) {
        res.json({'status':'You have already logged out'});
      } else {
        var query={'token':req.token};
        tokenSchema.userToken.remove(query,(err,data)=>{
            res.json({'status':'You have successfully logged out'});
          });
            }
        });

 });

 router.get('/certificate/:name',(req,res)=>{
 Jimp.read(__dirname+'/index.jpg')
    .then(function (image) {
        loadedImage = image;
        return Jimp.loadFont(Jimp.FONT_SANS_128_BLACK);
    })
    .then(function (font) {
        loadedImage.print(font,/*x AXIS*/ 1890, /*Y AXIS*/ 1050, req.params.name);
                 loadedImage.print(font,/*x AXIS*/ 1600, /*Y AXIS*/ 1240, 'Camarathon');
                    loadedImage.write(__dirname+'/image.jpg',()=>{
                      res.sendFile(__dirname+'/image.jpg');
                    });
                    
    })
    .catch(function (err) {
        console.error(err);
    });
  

            
 });

 module.exports=router;