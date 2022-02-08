require("dotenv").config(); //for accessing .env variables
const axios = require("axios"); //to call API's on other ports/services
const { check, validationResult } = require("express-validator"); //validations on API's
const express = require("express"); //express to write API's
const csvtojson = require("csvtojson"); //csvtojson to convert csv to json
const formidable = require("formidable"); //formidable to read files - Ingestion
const bodyParser = require("body-parser"); //to return JSON parse
const cors = require("cors"); //allows to call API's on other ports/services

// Connect
require("../db/db");
const User = require("./model");

const app = express();
const port = 5001;
app.use(cors());
app.use(bodyParser.json());

//INSERT users to DB from CSV
app.post("/api/uploadUsers", (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;

  form.parse(req, (err, fields, file) => {
    if (err) {
      console.log("err:", err);
      return res.status(404).json({
        error: "Cannot injest CSV",
      });
    }

    if (file.usersCSV) {
      var arrayToInsert = [];
      const usersCSV = file.usersCSV;
      csvtojson()
        .fromFile(usersCSV.filepath)
        .then((users) => {
          users.forEach((user, index) => {
            arrayToInsert.push(user);
          });
          User.insertMany(arrayToInsert, (err, result) => {
            if (err) {
              console.log("err:", err);
              const insertedUsers = [];
              err.insertedDocs?.forEach((user) => {
                insertedUsers.push(user?.userId);
              });
              return res.status(404).json({
                error: "Not able to save all users in DB!",
                insertedUsers: insertedUsers,
              });
            }
            return res.json(result);
          });
        });
    }
  });
});

//SIGNUP API
app.post(
  "/api/signup",
  check("userId").isEmail().withMessage("Please enter a proper mailId"),
  check("password")
    .isLength({ min: 10 })
    .withMessage("Password must be at least 10 chars long")
    .matches(/\d/)
    .withMessage("Password must contain atleast 1 number")
    .matches(/[A-Z]/)
    .withMessage("Password must contain atleast 1 upper case")
    .matches(/[a-z]/)
    .withMessage("Password must contain atleast 1 lower case")
    .matches(/[ -\/:-@\[-\`{-~ ]/)
    .withMessage("Password must contain atleast 1 special character"),
  async (req, res) => {
    const errors = validationResult(req);
    {
      if (!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array()[0].msg });
      }
    }

    //For existing user
    try {
      const user = await User.findOne({
        userId: req.body.userId,
      });
      if (user) {
        return res.json(user);
      }
    } catch (error) {
      return res.status(500).json({ message: "Internal server error." });
    }

    //Create new User
    const newUser = new User({ ...req.body });
    newUser.save((err, newUser) => {
      if (err) {
        return res.status(404).json({
          error: "Not able to save in DB!",
        });
      }
      return res.json(newUser);
    });
  }
);

//GET all users
app.get("/api/users", (req, res) => {
  User.find().exec((err, users) => {
    if (err) {
      return res.status(404).json({
        error: "Error! Please try again",
      });
    } else if (users.length <= 0) {
      return res.status(404).json({
        error: "No Users found",
      });
    }
    return res.json(users);
  });
});

//GET a user
app.get("/api/user/:id", (req, res) => {
  User.findById(req.params.id)
    .then((user) => {
      return res.json(user);
    })
    .catch((err) => {
      return res.status(404).json({
        error: "No User found",
      });
    });
});

//UPDATE API
app.put("/api/updateLike/:id/:userId", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (user) {
      try {
        const updatedContent = await axios.put(
          `http://localhost:5002/api/updateContent/${req.params.id}`
        );
        if (updatedContent) {
          return res.json(updatedContent.data);
        }
      } catch {
        return res.status(404).json({
          error: "Could not update like",
        });
      }
    }
  } catch (error) {
    return res.status(404).json({
      error: "User not found",
    });
  }
  return res.status(404).json({
    error: "Internal server error",
  });
});

//GET a user
app.get("/api/user/:id", (req, res) => {
  User.findById(req.params.id)
    .then((user) => {
      if (user) {
        return res.json(user);
      } else {
        return res.status(404).send("Users not found");
      }
    })
    .catch((err) => {
      return res.status(500).send("Internal Server Error!");
    });
});

//RUN User Service
app.listen(port, () => {
  console.log(`Up and Running on port ${port} - This is User service`);
});
