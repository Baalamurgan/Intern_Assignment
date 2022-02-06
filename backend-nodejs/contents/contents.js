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

app.post("/content", (req, res) => {
  const newContent = new Content({ ...req.body });
  newContent
    .save()
    .then(() => {
      res.send("New Content created successfully!");
    })
    .catch((err) => {
      res.status(500).send("Internal Server Error!");
    });
});

app.get("/contents", (req, res) => {
  Content.find().exec((err, contents) => {
    if (err) {
      return res.status(404).json({
        error: "No Books found",
      });
    }
    res.json(contents);
  });
});

app.put("/updateContent/:id", (req, res) => {
  console.log(req.params.id);
  Content.updateOne({ _id: req.params.id }, { $inc: { likes: 1 } }).exec(
    (err, updatedContent) => {
      if (err) {
        return res.status(404).json({
          error: "Error! Please try again",
        });
      }
      res.json(updatedContent);
    }
  );
});

app.listen(port, () => {
  console.log(`Up and Running on port ${port}- This is Content service`);
});
