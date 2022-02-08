const mongoose = require("mongoose");
var dbConn;
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
  })
  .then((client) => {
    dbConn = client;
    console.log("MongoDB Connection successful!");
  })
  .catch((err) => {
    console.log("MongoDB Connection failed!", err);
  });

return dbConn;
