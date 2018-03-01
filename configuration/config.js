module.exports = {
    dev: {
      port       : process.env.PORT || 3000,
      db         : process.env.DB_LINK || "mongodb://localhost:27017/restapi"
    },
    prod: {
        //to do something
    }
  }
  