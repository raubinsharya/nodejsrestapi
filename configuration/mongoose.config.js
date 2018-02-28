"use strict";
let mongoose = require('mongoose');

// activating Promises for mongoose
mongoose.Promise = global.Promise;

module.exports = (config) => {
    var dbURI = config.dev.db;
    mongoose.connect(dbURI, {
      }).then(() => {
      console.log(`mongodb connected to ${dbURI}`);
    }).catch((e) => {
      throw e;
    });
};
