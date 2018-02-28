"use strict";

var app          = require('express')();
const express    = require('express');
const path       = require('path');

const config               =   require('./configuration/config');
const mongooseconfig       =   require('./configuration/mongoose.config')(config);
const expressconfig        =   require('./configuration/express.config')(app);

app.use('/public', express.static(path.join(__dirname, 'public')));


app.use((req, res, next) => {
    const error = new Error("Not found");
    error.status = 404;
    next(error);
  });
  
  app.use((error, req, res, next) => {
    res.status(error.status || 404);
    res.json({message:'404! URL not found'});
  });
    
app.listen(config.dev.port,()=>{
     console.log('Server is running on port',config.dev.port);
});
