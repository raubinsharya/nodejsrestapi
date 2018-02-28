const mongoose  =   require('mongoose');

const FileUploadSchema  =   mongoose.Schema({
        fileName:{
            type:String,
            required:true
        },
        userName:{
            type:String,
            required:true
        },
        originalFileName:{
            type:String,
            required:true
        }
});

module.exports.saveFileNameInDataBase=mongoose.model('userFiles',FileUploadSchema);
