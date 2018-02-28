"use strict";
    
    var mongoose        =   require('mongoose');
    var multer          =   require('multer');
    var GridFsStorage   =   require('multer-gridfs-storage');
    var Grid            =   require('gridfs-stream');

    const conn = mongoose.connection;
    Grid.mongo = mongoose.mongo;
    const gfs = Grid(conn.db);
    var rootName='ctFiles';
    
    const storage = GridFsStorage({
        gfs : gfs,
        filename: function (req, file, callback) {
            callback(null,file.originalname);                //to store original file name from request
        },
        /** With gridfs we can store aditional meta-data along with the file */
        metadata: function(req, file, callback) {
            callback(null, { originalname: file.originalname });
        },
        root: rootName                                     //root name for collection to store files into
    });
    var upload = multer({                                //multer settings for single upload
        storage: storage
    }).single('file'); 

module.exports.upload=(req,res)=>{
    upload(req,res,(err)=>{
      res.json({'status':'file uploaded successful'});
    })  
}                                     //file is the name of file argument passed from client


    module.exports.show=function(req,res,name){
         gfs.collection('ctFiles');                         //set collection name to lookup into
        /** First check if file exists */
        gfs.files.find({filename: req.params.filename}).toArray(function(err, files){
            if(!files || files.length === 0){
                return res.status(404).json({
                   'status':'File not found'
                });
            }
            /** create read stream */
            var readstream = gfs.createReadStream({
                filename: files[0].filename,
                root: name
            });
            /** set the proper content type */
            res.set('Content-Type', files[0].contentType)
            /** return response */
            return readstream.pipe(res);
        });
    };