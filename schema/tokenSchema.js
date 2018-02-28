const mongoose  =   require('mongoose');

const TokenSchema  =   mongoose.Schema({
         token:{
             type:String,
             required:true
         },
         secretkey:{
             type:String,
             required:true
         },
         email:{
              type:String,
              required:true
         }
});

module.exports.userToken=mongoose.model('usertokens',TokenSchema);
