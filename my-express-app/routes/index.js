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

//1. API ROUTES FOR THE MUST-HAVES TABLE
//Get full must-haves list
app.get("/must-haves-list", (req, res) => {
  db("select * from job_must_haves;")
    .then((results) => res.send(results.data))
    .catch((err) => res.status(500).send(err));
});

//add to must-haves list
app.post("/must-have", (req, res) => {
  db(
    `INSERT INTO job_must_haves(must_haves) VALUES ("${req.body.must_haves}");`
  )
    .then((result) =>
      db("SELECT * FROM job_must_haves;").then((results) => {
        res.send(results.data);
      })
    )
    .catch((err) => res.status(500).send(err));
});

//delete from list by id
app.delete("/must-have/:id", (req, res) => {
  db(`DELETE FROM job_must_haves WHERE id=${req.params.id}`)
    .then((result) => db("SELECT * FROM job_must_haves;"))
    .then((results) => {
      res.send(results.data);
    });
});

//2. API ROUTES FOR THE NEGOTIABLES TABLE
//get the full negotiables list
app.get("/negotiables-list", (req, res) => {
  db("select * from job_negotiables;")
    .then((results) => res.send(results.data))
    .catch((err) => res.status(500).send(err));
});

//add to the negotiables
app.post("/negotiable", (req, res) => {
  db(
    `INSERT INTO job_negotiables(negotiables) VALUES ("${req.body.negotiables}");`
  )
    .then((result) =>
      db("SELECT * FROM job_negotiables;").then((results) => {
        res.send(results.data);
      })
    )
    .catch((err) => res.status(500).send(err));
});

//delete from list by id

app.delete("/negotiable/:id", (req, res) => {
  db(`DELETE FROM job_negotiables WHERE id=${req.params.id}`)
    .then((result) => db("SELECT * FROM job_negotiables;"))
    .then((results) => {
      res.send(results.data);
    });
});

//3. API ROUTES FOR THE DEAL-BREAKERS TABLE
//get full list
app.get("/dealbreakers-list", (req, res) => {
  db("select * from job_deal_breakers;")
    .then((results) => res.send(results.data))
    .catch((err) => res.status(500).send(err));
});

//add to list
app.post("/dealbreaker", (req, res) => {
  db(
    `INSERT INTO job_deal_breakers(deal_breakers) VALUES ("${req.body.deal_breakers}");`
  )
    .then((result) =>
      db("SELECT * FROM job_deal_breakers;").then((results) => {
        res.send(results.data);
      })
    )
    .catch((err) => res.status(500).send(err));
});

//delete from list by id
app.delete("/dealbreaker/:id", (req, res) => {
  db(`DELETE FROM job_deal_breakers WHERE id=${req.params.id}`)
    .then((result) => db("SELECT * FROM job_deal_breakers;"))
    .then((results) => {
      res.send(results.data);
    });
});

//4. API ROUTES FOR THE NICE2HAVES TABLE
//get full list
app.get("/nice2haves-list", (req, res) => {
  db("select * from job_nice2haves;")
    .then((results) => res.send(results.data))
    .catch((err) => res.status(500).send(err));
});
//add to list
app.post("/nice2have", (req, res) => {
  db(
    `INSERT INTO job_nice2haves(nice_to_have) VALUES ("${req.body.nice_to_have}");`
  )
    .then((result) =>
      db("SELECT * FROM job_nice2haves;").then((results) => {
        res.send(results.data);
      })
    )
    .catch((err) => res.status(500).send(err));
});

//delete from list by id

app.delete("/nice2have/:id", (req, res) => {
  db(`DELETE FROM job_nice2haves WHERE id=${req.params.id}`)
    .then((result) => db("SELECT * FROM job_nice2haves;"))
    .then((results) => {
      res.send(results.data);
    });
});

/*API ROUTES FOR THE Q & A TABLE*/
//get the full list of q & as
app.get("/q-and-as-list", (req, res) => {
  db("select * from q_and_as;")
    .then((results) => res.send(results.data))
    .catch((err) => res.status(500).send(err));
});

//add a new q& a card
app.post("/q-and-a", (req, res) => {
  db(
    `INSERT INTO q_and_as(question, answer, tag_id) VALUES ("${req.body.question}","${req.body.answer}","${req.body.tag_id}");`
  )
    .then((result) =>
      db("SELECT * FROM q_and_as;").then((results) => {
        res.send(results.data);
      })
    )
    .catch((err) => res.status(500).send(err));
});

//delete a q & a from the list by id
app.delete("/q-and-a/:id", (req, res) => {
  db(`DELETE FROM q_and_as WHERE id=${req.params.id}`)
    .then((result) => db("SELECT * FROM q_and_as;"))
    .then((results) => {
      res.send(results.data);
    });
});

/*API ROUTES FOR THE TEACH A TOPIC TABLE */
//GET THE LIST OF ENTRIES
app.get("/lesson-list", (req, res) => {
  db("select * from teach_a_topic;")
    .then((results) => res.send(results.data))
    .catch((err) => res.status(500).send(err));
});

//ADD A NEW ENTRY
app.post("/lesson", (req, res) => {
  db(
    `INSERT INTO teach_a_topic(date, topic_title, step_by_step, tag_id) VALUES ("${new Date()}","${
      req.body.topic_title
    }","${req.body.step_by_step}","${req.body.tag_id}");`
  )
    .then((result) =>
      db("SELECT * FROM teach_a_topic;").then((results) => {
        res.send(results.data);
      })
    )
    .catch((err) => res.status(500).send(err));
});

//DELETE AN ENTY

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
