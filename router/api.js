"use strict";
const router        =   require('express').Router();
const jwt           =   require('jsonwebtoken');
const Jimp          =   require("jimp");

var uploads         =   require('../models/upload');
var config          =   require('../configuration/config');
const dbSchema      =   require('../schema/dbSchema');
var loadedImage;

router.put('/upload',function(req, res) {  
    uploads.upload(req,res);
});
router.post('/file', function(req,res){
     uploads.show(req.body.fileName,res);
   });

router.get('/dashboard',(req,res)=>{
          res.send('You have no dashboard yet...comming soon');
 });
   router.post('/logout',(req,res)=>{
    var query={'token':req.token};
       dbSchema.userToken.remove(query,(err,data)=>{
            res.json({'status':'You have successfully logged out'});
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

 router.delete('/delete',(req, res)=> {  
  uploads.deleteFile(req,res);
 });

 router.get('/all/:content',(req,res)=>{
        if(req.params.content=='file')
            dbSchema.saveFileNameInDataBase.find({},(err,data)=>{res.send(data);}).where({'userName':req.body.user});
        else if(req.params.content=='post')
            dbSchema.UserPostSchema.find({},(err,data)=>{
                res.send(data);
            }).where({'user':req.body.user});
            else res.json({'message':'request not found'});
      });
 router.post('/post',(req,res)=>{
       uploads.uploadPost(req,res);
  });
     

 module.exports=router;