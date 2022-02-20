const express = require("express");
const app = express();
const port = 5001;
const db = require("../model/helper");
var cors = require("cors");

app.use(cors());

//Added in these next lines to try to solve undefined object issue I was having with post method
//after running npm install --save body-parser
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
//And it works!

//What shows up when you call the datbase for the first time
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

//Response when database is called
app.get("/", (req, res) => {
  res.send("Welcome to the API");
});

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});

app.get("/must-haves", (req, res) => {
  db("select * from job_reqs;")
    .then((results) => res.send(results.data))
    .catch((err) => res.status(500).send(err));
});

module.exports = app;

//WHAT WAS IN THE APP BEFORE I STARTED CHANGING IT
/*var express = require("express");
var router = express.Router();*/

/* GET home page. */
/*
router.get("/", function (req, res, next) {
  res.send({ title: "Express" });
});


module.exports = router;
*/
