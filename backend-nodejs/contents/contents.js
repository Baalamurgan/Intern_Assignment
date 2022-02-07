require("dotenv").config();
const express = require("express");

// Connect
require("../db/db");

const Content = require("./model");

const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = 5002;
app.use(cors());
app.use(bodyParser.json());

app.post("/api/content", (req, res) => {
  const newContent = new Content({ ...req.body });
  newContent
    .save()
    .then(() => {
      return res.send("New Content created successfully!");
    })
    .catch((err) => {
      return res.status(500).send("Internal Server Error!");
    });
});

app.get("/api/content/:id", (req, res) => {
  Content.findById(req.params.id)
    .then((content) => {
      return res.json(content);
    })
    .catch((err) => {
      return res.status(404).json({
        error: "No Content found",
      });
    });
});

app.put("/api/updateContent/:id", (req, res) => {
  Content.findOneAndUpdate(
    { _id: req.params.id },
    { $inc: { likes: 1 } },
    { returnDocument: "after" }
  ).exec((err, updatedContent) => {
    if (err) {
      return res.status(404).json({
        error: "No Content found",
      });
    }
    return res.json(updatedContent);
  });
});

app.get("/api/topcontents", (req, res) => {
  Content.find()
    .sort([["likes", "desc"]])
    .exec((err, topcontents) => {
      if (err) {
        return res.status(404).json({
          error: "Error! Please try again",
        });
      }
      return res.json(topcontents);
    });
});

app.listen(port, () => {
  console.log(`Up and Running on port ${port}- This is Content service`);
});
