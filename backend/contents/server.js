require("dotenv").config(); //for accessing .env variables
const express = require("express"); //express to write API's
const csvtojson = require("csvtojson"); //csvtojson to convert csv to json
const formidable = require("formidable"); //formidable to read files - Ingestion
const bodyParser = require("body-parser"); //to return JSON parse
const cors = require("cors"); //allows to call API's on other ports/services

// Connect to DB
require("./db/db");
const Content = require("./models/model");

const app = express();
const port = 5002;
app.use(cors());
app.use(bodyParser.json());

//INSERT contents to DB from CSV
app.post("/uploadContents", (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;

  form.parse(req, (err, fields, file) => {
    if (err) {
      console.log("err:", err);
      return res.status(404).json({
        error: "Cannot injest CSV",
      });
    }

    if (file.contentsCSV) {
      var arrayToInsert = [];
      const contentsCSV = file.contentsCSV;
      csvtojson()
        .fromFile(contentsCSV.filepath)
        .then((contents) => {
          contents.forEach((content, index) => {
            arrayToInsert.push(content);
          });
          Content.insertMany(arrayToInsert, (err, result) => {
            if (err) {
              const insertedContents = [];
              err.insertedDocs?.forEach((content) => {
                insertedContents.push(content?.title);
              });
              return res.status(404).json({
                error: "Not able to save all contents in DB!",
                insertedContents: insertedContents,
              });
            }
            return res.json(result);
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  });
});

//POST a new content to DB
app.post("/content", (req, res) => {
  const newContent = new Content({ ...req.body });
  newContent
    .save()
    .then(() => {
      return res.send("New Content created successfully!");
    })
    .catch((err) => {
      return res.status(404).send("Internal Server Error!");
    });
});

//GET a content
app.get("/content/:id", (req, res) => {
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

//UPDATE likes of a content
app.put("/updateContent/:id", (req, res) => {
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

//TOPCONTENTS API
app.get("/topcontents", (req, res) => {
  Content.find()
    .sort([["likes", "desc"]])
    .exec((err, topcontents) => {
      if (err) {
        return res.status(404).json({
          error: "Error! Please try again",
        });
      } else if (topcontents.length <= 0) {
        return res.status(404).json({
          error: "No Contents found",
        });
      }
      return res.json(topcontents);
    });
});

//RUN Content Service
app.listen(port, () => {
  console.log(`Up and Running on port ${port}- This is Content service`);
});
