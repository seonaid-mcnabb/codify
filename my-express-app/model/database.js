require("dotenv").config();
const mysql = require("mysql");

const DB_HOST = process.env.DB_HOST;
const DB_USER = process.env.DB_USER;
const DB_PASS = process.env.DB_PASS;
const DB_NAME = process.env.DB_NAME;

const con = mysql.createConnection({
  host: DB_HOST || "127.0.0.1",
  user: DB_USER || "root",
  password: DB_PASS,
  database: DB_NAME || "codify",
  multipleStatements: true,
});

con.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");

  //ADD THE TABLES THAT YOU WANT IN THE BACK-END HERE\\
  let jobReqsSQL =
    "DROP TABLE if exists job_reqs; CREATE TABLE job_reqs(id INT NOT NULL PRIMARY KEY AUTO_INCREMENT, must_haves VARCHAR(200), negotiables VARCHAR(200), deal_breakers VARCHAR(200), nice_to_haves VARCHAR(200));";
  con.query(jobReqsSQL, function (err, result) {
    if (err) throw err;
    console.log("Table creation `job_reqs` was successful!");

    console.log("Closing...");
  });

  con.end();
});
