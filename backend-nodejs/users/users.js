require("dotenv").config();
const express = require("express");
const axios = require("axios");

// Connect
require("../db/db");

const User = require("./model");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = 5001;
app.use(cors());
app.use(bodyParser.json());

app.post("/api/signup", (req, res) => {
  const newUser = new User({ ...req.body });
  newUser.save((err, newUser) => {
    if (err) {
      return res.status(404).json({
        error: "Not able to save in DB!",
      });
    }
    res.json(newUser);
  });
});

app.get("/api/users", (req, res) => {
  User.find().exec((err, users) => {
    if (err) {
      return res.status(404).json({
        error: "No Users found",
      });
    }
    return res.json(users);
  });
});

app.put("/api/updateLike/:id/:userId", (req, res) => {
  User.findById(req.params.userId).exec((err, user) => {
    if (err || !user) {
      return res.status(404).json({
        error: "User not found",
      });
    } else {
      axios
        .put(`http://localhost:5002/api/updateContent/${req.params.id}`)
        .then((updatedContent) => {
          return res.json(updatedContent.data);
        })
        .catch((err) => {
          return res.status(404).json({
            error: "Could not update like",
          });
        });
      return res.json(user);
    }
  });
});

app.get("/api/user/:id", (req, res) => {
  User.findById(req.params.id)
    .then((user) => {
      if (user) {
        res.json(user);
      } else {
        res.status(404).send("Users not found");
      }
    })
    .catch((err) => {
      res.status(500).send("Internal Server Error!");
    });
});

app.listen(port, () => {
  console.log(`Up and Running on port ${port} - This is User service`);
});
