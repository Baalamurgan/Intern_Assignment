const mongoose = require("mongoose");

//CONNECT to MONGODB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("MongoDB Connection successful!");
  })
  .catch((err) => {
    console.log("MongoDB Connection failed!", err);
  });
