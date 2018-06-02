module.exports = {
    dev: {
      port       : process.env.PORT || 3000,
      db:process.env.DB_LINK || "mongodb://raubinsharya:1234@ds111370.mlab.com:11370/myrestapi"
    },
    prod: {
        //to do something
    }
  }
  
