'use-strict';
const mongoose    = require('mongoose');
/* ########################################################################################################### */
const userSchema = mongoose.Schema({
  username:{
    type:String,
    required:true
  },
  email:{
    type:String,
    required:true,
    unique: true
  },
  password:{
    type:String,
    required:true
  }
});
/* ############################################################################################################## */
const userPostSchema = mongoose.Schema({
  user:{
    type:String,
    required:true
  },
  postName:{
     type:String,
     required:true
  },
  post:{
    type:String,
    required:true
  },
  date:{
    type:String,
    required:true
  }
});
/* ############################################################################################################## */
const FileUploadSchema = mongoose.Schema({
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
/* ############################################################################################################## */
const TokenSchema  =   mongoose.Schema({
  token:{
      type:String,
      required:true
  },
  loginTime:{
      type:String,
      required:true
  },
  email:{
       type:String,
       required:true
  }
});
/* ############################################################################################################## */
module.exports.userToken                 =  mongoose.model('usertokens',TokenSchema);
module.exports.UserPostSchema                  =  mongoose.model('Posts', userPostSchema);
module.exports.saveFileNameInDataBase    =  mongoose.model('userFiles',FileUploadSchema);
module.exports.User                      =  mongoose.model('Users', userSchema);