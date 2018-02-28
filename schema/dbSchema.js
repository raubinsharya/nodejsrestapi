'use-strict';

var mongoose    = require('mongoose');
var userSchema = mongoose.Schema({
  username:{
    type:String,
    required:true
  },
  email:{
    type:String,
    required:true
  },
  password:{
    type:String,
    required:true
  },
  file:{
    data:Buffer,
    contentType:String
  }
});
module.exports.User  = mongoose.model('Users', userSchema);
