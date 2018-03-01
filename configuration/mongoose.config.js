"use strict";
let mongoose = require('mongoose');

// activating Promises for mongoose
mongoose.Promise = global.Promise;

module.exports = (config) => {
        mongoose.connect(config.dev.db, {
      }).then(() => {
      console.log(`mongodb connected to ${config.dev.db}`);
    }).catch((e) => {
      console.log('Mongodb '+e.message);
      
    });
};
