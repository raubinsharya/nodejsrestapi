"use strict";

const logger           =   require('morgan');
const bodyParser       =   require('body-parser');
var expressValidator   =   require('express-validator');
const exphbs           =   require('express-handlebars');
const express          =   require('express');
const path             =   require('path');
var favicon            =   require('serve-favicon')
var auth               =   require('../models/verify_authentication');

module.exports = (app) => {
    //using middleware
    app.use(logger('dev'));
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
    app.use(expressValidator());
    app.use(favicon(path.join(__dirname, '../public', 'favicon.png')))
    app.engine('handlebars', exphbs());
	app.set('view engine', 'handlebars');
    app.use((req, res, next) => {
        res.header("Access-Control-Allow-Origin", "*");
        res.header(
          "Access-Control-Allow-Headers",
          "Origin, X-Requested-With, Content-Type, Accept, Authorization"
        );
        if (req.method === "OPTIONS") {
          res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
          return res.status(200).json({});
        }
        next();
      });

     //[*]Routes Configuration
    var login      =  require('../router/login');
    var api        =  require('../router/api');
    
    //setting routes
    app.use('/',login);
    app.use('/api',api);
    
 
};
