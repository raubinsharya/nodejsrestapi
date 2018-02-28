"use strict";

var multer          =   require('multer');
const path          =   require('path');
const fileSchema    =   require('../schema/file_uploadSchema');

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
                res.json({'message':'File uploaded successfully... '})
           }
        }
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