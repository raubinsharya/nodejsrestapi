"use strict";

var multer          =   require('multer');
const path          =   require('path');
const fs            =   require('fs'); 
const fileSchema    =   require('../schema/dbSchema');

// Set The Storage Engine
const storage = multer.diskStorage({
    destination: './userfiles/',
      filename: function(req, file, cb){
        var fileName=file.fieldname + '-' + Date.now() + path.extname(file.originalname);
        const fileUpload=new fileSchema.saveFileNameInDataBase({
           fileName:fileName,
           userName:req.user,
           originalFileName:file.originalname
      }).save();
        cb(null,fileName);
      }
    });
  
  var upload = multer({
    storage: storage,
    limits:{fileSize: 100000000},
    /* fileFilter: function(req, file, cb){
      checkFileType(file, cb);
    } */                                          // remove comment to restrict user to upload only image and of type jpeg/jpg/png/gif 
  }).array('file');
  function checkFileType(file, cb){
    // Allowed ext
    const filetypes = /jpeg|jpg|png|gif/;
    // Check ext
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    // Check mime
    const mimetype = filetypes.test(file.mimetype);
  
    if(mimetype && extname){
      return cb(null,true);
    } else {
      cb('Error: Images Only!');
    }
  }
module.exports.upload=(req,res)=>{
    upload(req, res, (err) => {
        if(err){
           res.send(err);
        } else {
          if(req.files == undefined){
              res.json({'message':'No file selected'});
          } else {
                res.json({'message':'File uploaded successfully...'})
           }
        }
      });
}  
module.exports.deleteFile=(req,res)=>{
      var query={'originalFileName':req.body.fileName};
      fileSchema.saveFileNameInDataBase.findOneAndRemove(query,(err,data)=>{
          if(data!=null){
            fs.unlinkSync(path.join(__dirname, '../userfiles', data.fileName));
             res.json({'message':'File deleted successfully'});
          }else res.json({'message':'No file to delete'});
      });
}
module.exports.show=(fileName,res)=>{
    var query;
    if(fileName.includes('file'))
        query={'fileName':fileName}
        else query={"originalFileName":fileName};
     fileSchema.saveFileNameInDataBase.find(query,(err,fileData)=>{
        if(fileData.length>0)
          res.sendFile(path.join(__dirname, '../userfiles', fileData[0].fileName));
            else res.json({'message':'file not found'});
          });
    }

module.exports.uploadPost=(req,res)=>{
    req.body.date=new Date; 
    fileSchema.UserPostSchema.create(req.body,(err,data)=>{
          if(err)
            res.send(err);
            else res.json({'message':'post upload successful'});
    });
}

