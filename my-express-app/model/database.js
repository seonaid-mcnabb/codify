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

  /* DATABASE TABLES FOR THE WORKREQSLIST.JS COMPONENT */
  //Add table to store job must-haves
  let jobMustHavesSQL =
    "DROP TABLE if exists job_must_haves; CREATE TABLE job_must_haves(id INT NOT NULL PRIMARY KEY AUTO_INCREMENT, must_haves VARCHAR(200));";
  con.query(jobMustHavesSQL, function (err, result) {
    if (err) throw err;
    console.log("Table creation `job_must_haves` was successful!");

    console.log("Closing...");
  });

  //Add table to store job negotiables
  let jobNegotiablesSQL =
    "DROP TABLE if exists job_negotiables; CREATE TABLE job_negotiables (id INT NOT NULL PRIMARY KEY AUTO_INCREMENT, negotiables VARCHAR(200));";
  con.query(jobNegotiablesSQL, function (err, result) {
    if (err) throw err;
    console.log("Table creation `job_negotiables` was successful!");

    console.log("Closing...");
  });

  //Add table to store job deal-breakers
  let jobDealBreakersSQL =
    "DROP TABLE if exists job_deal_breakers; CREATE TABLE job_deal_breakers (id INT NOT NULL PRIMARY KEY AUTO_INCREMENT, deal_breakers VARCHAR(200));";
  con.query(jobDealBreakersSQL, function (err, result) {
    if (err) throw err;
    console.log("Table creation `job_deal_breakers` was successful!");

    console.log("Closing...");
  });

  //Add table to store job nice-to-haves
  let jobNice2HavesSQL =
    "DROP TABLE if exists job_nice2haves; CREATE TABLE job_nice2haves (id INT NOT NULL PRIMARY KEY AUTO_INCREMENT, nice_to_have VARCHAR(200));";
  con.query(jobNice2HavesSQL, function (err, result) {
    if (err) throw err;
    console.log("Table creation `job_nice2haves` was successful!");

    console.log("Closing...");
  });

  //Create the tags table
  let tagsSQL =
    "DROP TABLE if exists tags; CREATE TABLE tags(tag_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT, tag_name VARCHAR(40));";
  con.query(tagsSQL, function (err, result) {
    if (err) throw err;
    console.log("Table creation `tags` was successful!");
    console.log("Closing...");
  });

  //Create the q & as table
  let qAndAsSQL =
    "DROP TABLE if exists q_and_as; CREATE TABLE q_and_as(id INT NOT NULL PRIMARY KEY AUTO_INCREMENT, question TEXT, answer TEXT, tag_id INT, FULLTEXT(question, answer ));";
  con.query(qAndAsSQL, function (err, result) {
    if (err) throw err;
    console.log("Table creation `q_and_as` was successful!");
    console.log("Closing...");
  });

  //This creates the teachatopic table
  let teachATopicSQL =
    "DROP TABLE if exists teach_a_topic; CREATE TABLE teach_a_topic(id INT NOT NULL PRIMARY KEY AUTO_INCREMENT, date VARCHAR(100), topic_title VARCHAR(75), step_by_step TEXT, tag_id INT);";
  con.query(teachATopicSQL, function (err, result) {
    if (err) throw err;
    console.log("Table creation `teach_a_topic` was successful!");
    console.log("Closing...");
  });

  con.end();
});
