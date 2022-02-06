const mongoose = require("mongoose");
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("MongoDB Connection successful!");
  })
  .catch((e) => {
    console.log("MongoDB Connection failed!");
  });
