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

//1. API ROUTES FOR THE MUST-HAVES TABLES
//GET FULL LIST OF MUST-HAVES
app.get("/must-haves-list", (req, res) => {
  db("select * from job_must_haves;")
    .then((results) => res.send(results.data))
    .catch((err) => res.status(500).send(err));
});

//ADD A NEW MUST HAVE
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

//DELETE FROM MUST-HAVES BY ID
app.delete("/must-have/:id", (req, res) => {
  db(`DELETE FROM job_must_haves WHERE id=${req.params.id}`)
    .then((result) => db("SELECT * FROM job_must_haves;"))
    .then((results) => {
      res.send(results.data);
    });
});

//2. API ROUTES FOR THE NEGOTIABLES TABLE
//GET FULL LIST OF NEGOTIABLES
app.get("/negotiables-list", (req, res) => {
  db("select * from job_negotiables;")
    .then((results) => res.send(results.data))
    .catch((err) => res.status(500).send(err));
});

//ADD TO THE NEGOTIABLES LIST
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

//DELETE FROM THE NEGOTIABLES LIST BY ID
app.delete("/negotiable/:id", (req, res) => {
  db(`DELETE FROM job_negotiables WHERE id=${req.params.id}`)
    .then((result) => db("SELECT * FROM job_negotiables;"))
    .then((results) => {
      res.send(results.data);
    });
});

//3. API ROUTES FOR THE DEAL-BREAKERS TABLE
//GET FULL LIST OF DEALBREAKERS
app.get("/dealbreakers-list", (req, res) => {
  db("select * from job_deal_breakers;")
    .then((results) => res.send(results.data))
    .catch((err) => res.status(500).send(err));
});

//ADD TO DEALBREAKERS LIST
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

//DELETE FROM DEALBREAKERS LIST BY ID
app.delete("/dealbreaker/:id", (req, res) => {
  db(`DELETE FROM job_deal_breakers WHERE id=${req.params.id}`)
    .then((result) => db("SELECT * FROM job_deal_breakers;"))
    .then((results) => {
      res.send(results.data);
    });
});

//4. API ROUTES FOR THE NICE2HAVES TABLE
//GET FULL LIST OF NICE2HAVES
app.get("/nice2haves-list", (req, res) => {
  db("select * from job_nice2haves;")
    .then((results) => res.send(results.data))
    .catch((err) => res.status(500).send(err));
});

//ADD TO NICE2HAVES LIST
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

//DELETE FROM NICE2HAVES LIST BY ID
app.delete("/nice2have/:id", (req, res) => {
  db(`DELETE FROM job_nice2haves WHERE id=${req.params.id}`)
    .then((result) => db("SELECT * FROM job_nice2haves;"))
    .then((results) => {
      res.send(results.data);
    });
});

/*API ROUTES FOR THE TAGS TABLE (NOT YET IMPLEMENTED)*/

//GET THE FULL LIST OF TAGS
app.get("/tags-list", (req, res) => {
  db("select * from tags;")
    .then((results) => res.send(results.data))
    .catch((err) => res.status(500).send(err));
});

//ADD A TAG
app.post("/tag", (req, res) => {
  db(`INSERT INTO tags(tag_name) VALUES ("${req.body.tag_name}");`)
    .then((result) =>
      db("SELECT * FROM tags;").then((results) => {
        res.send(results.data);
      })
    )
    .catch((err) => res.status(500).send(err));
});

/*API ROUTES FOR THE Q & A TABLE*/
//GET THE FULL LIST OF Q & As
app.get("/q-and-as-list", (req, res) => {
  db("select * from q_and_as ORDER BY ID DESC;")
    .then((results) => res.send(results.data))
    .catch((err) => res.status(500).send(err));
});

//ADD A NEW Q&A CARD
app.post("/q-and-a", (req, res) => {
  db(
    `INSERT INTO q_and_as(question, answer, tag_id) VALUES ("${req.body.question}","${req.body.answer}","${req.body.tag_id}");`
  )
    .then((result) =>
      db("SELECT * FROM q_and_as ORDER BY ID DESC;").then((results) => {
        res.send(results.data);
      })
    )
    .catch((err) => res.status(500).send(err));
});

//DELETE A Q&A FROM THE LIST BY ID
app.delete("/q-and-a/:id", (req, res) => {
  db(`DELETE FROM q_and_as WHERE id=${req.params.id}`)
    .then((result) => db("SELECT * FROM q_and_as ORDER BY ID DESC;"))
    .then((results) => {
      res.send(results.data);
    });
});

//FULL TEXT SEARCH THROUGH THE Q & A CARDS
app.get("/q-and-as-list-search/:searchTerms", (req, res) => {
  db(
    `SELECT * FROM q_and_as WHERE MATCH(question, answer) AGAINST ("${req.params.searchTerms}");`
  )
    .then((results) => {
      res.send(results.data);
    })
    .catch((err) => res.status(500).send(err));
});

/*API ROUTES FOR THE TEACH A TOPIC TABLE */
//GET THE FULL LIST OF TOPIC ENTRIES
app.get("/lesson-list", (req, res) => {
  db("select * from teach_a_topic ORDER BY ID DESC;")
    .then((results) => res.send(results.data))
    .catch((err) => res.status(500).send(err));
});

//ADD A NEW LESSON ENTRY
app.post("/lesson", (req, res) => {
  db(
    `INSERT INTO teach_a_topic(date, topic_title, step_by_step, tag_id) VALUES ("${new Date()}","${
      req.body.topic_title
    }","${req.body.step_by_step}","${req.body.tag_id}");`
  )
    .then((result) =>
      db("SELECT * FROM teach_a_topic ORDER BY ID DESC;").then((results) => {
        res.send(results.data);
      })
    )
    .catch((err) => res.status(500).send(err));
});

//DELETE A LESSON BY ID
app.delete("/lesson/:id", (req, res) => {
  db(`DELETE FROM teach_a_topic WHERE id=${req.params.id}`)
    .then((result) => db("SELECT * FROM teach_a_topic ORDER BY ID DESC;"))
    .then((results) => {
      res.send(results.data);
    });
});

//FULL TEXT SEARCH FOR A LESSON (Implemented for titles as well as content)
app.get("/lesson-list/:searchTerms", (req, res) => {
  db(
    `SELECT * FROM teach_a_topic WHERE MATCH(topic_title, step_by_step) AGAINST ("${req.params.searchTerms}");`
  )
    .then((results) => {
      res.send(results.data);
    })
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
