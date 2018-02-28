'user-strict';

const fs    =   require('fs');

//array to store token of users
module.exports.tokens = [{}];



//to store token data in file if needed
/*

module.exports.getToken = ()=>{
    fs.readFile('./object.txt', 'utf8',function(err,data){
    
        var obj = JSON.parse(data);
        console.log(obj);
        
        });
}

module.exports.saveToken = (token,callback)=>{
    fs.writeFileSync("./token.txt", JSON.stringify(tokens), (err) => {
        if (err) {
            console.error(err);
            return;
        }else{
        console.log("File has been created");
        callback();
    }
  });
}






fs.writeFileSync("./object.txt", JSON.stringify(sampleObject));


var obj = JSON.parse(fs.readFileSync('./object.txt', 'utf8'));
console.log(obj);*/ //to read and write async method 
