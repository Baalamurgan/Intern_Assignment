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

app.post("/user", (req, res) => {
  const newUser = new User({ ...req.body });
  newUser
    .save()
    .then(() => {
      res.send("New User created successfully!");
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("Internal Server Error!");
    });
});

app.get("/users", (req, res) => {
  User.find().exec((err, users) => {
    if (err) {
      return res.status(404).json({
        error: "No Users found",
      });
    }
    res.json(users);
  });
});

app.put("/updateLike/:id/:userId", (req, res) => {
  User.findById(req.params.userId)
    .then((user) => {
      axios
        .put(`http://localhost:5002/updateContent/${req.params.id}`)
        .then((content) => {
          console.log(content);
          res.json("Updated Like");
        })
        .catch((err) => {
          console.log(err);
          res.status(500).send("Unable to like");
        });
    })
    .catch((err) => {
      res.status(500).send("User not found!");
    });
});

app.get("/user/:id", (req, res) => {
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
