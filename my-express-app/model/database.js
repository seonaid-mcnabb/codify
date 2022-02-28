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
  /*CURRENTLY NOT USED AS TABLE LINKING NOT IMPLEMENTED
  let tagsSQL =
    "DROP TABLE if exists tags; CREATE TABLE tags(tag_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT, tag_name VARCHAR(40));";
  con.query(tagsSQL, function (err, result) {
    if (err) throw err;
    console.log("Table creation `tags` was successful!");
    console.log("Closing...");
  });
  */

  //Create the q & as table
  let qAndAsSQL =
    "DROP TABLE if exists q_and_as; CREATE TABLE q_and_as(id INT NOT NULL PRIMARY KEY AUTO_INCREMENT, question TEXT, answer TEXT, tag_id INT, FULLTEXT(question, answer)); INSERT INTO q_and_as(question, answer) VALUES ('What are the 4 principles of object oriented programming?','Encapsulation, abstraction, inheritance, and polymorphism'),('How do you remove an item from the end of an array in JavaScript?','Use the .pop() method'), ('What does FIFO stand for and what data structure does it refer to?','It stands for first in, first out and is used in queues'), ('What are the main data types in JavaScript?','Boolean, null, undefined, number, string, symbol, BigInt, and Objects'), ('What is recursion?','A CS concept that will make you doubt your decision to study programming.');";
  con.query(qAndAsSQL, function (err, result) {
    if (err) throw err;
    console.log("Table creation `q_and_as` was successful!");
    console.log("Closing...");
  });

  //This creates the teachatopic table
  let teachATopicSQL =
    "DROP TABLE if exists teach_a_topic; CREATE TABLE teach_a_topic(id INT NOT NULL PRIMARY KEY AUTO_INCREMENT, date VARCHAR(100), topic_title VARCHAR(75), step_by_step TEXT, tag_id INT, FULLTEXT(topic_title, step_by_step)); INSERT INTO teach_a_topic(date, topic_title, step_by_step) VALUES('Tue Feb 22','Github: How To Merge To Staging Branch','<p>When working on a group project on Github,  create a branch called &quot;<strong>staging</strong>&quot; in your repo, where all members can merge changes from their individual branches before pushing the final project to main.</p><p><em><strong>Steps</strong></em></p><p><strong>From your own branch, when you are ready to commit and merge changes:</strong></p><ul><li>git pull origin staging</li><li>git add .</li><li>git commit -m &quot;your commit message&quot;</li><li>git push</li><li>git checkout staging</li></ul><p><strong>On the staging branch:</strong></p><ul><li>git merge --&gt;name of your branch&lt;--</li><li>resolve any conflicts if necessary</li><li>git push to update staging branch</li><li>git checkout --&gt;name of your branch&lt;-- to get back to work!</li></ul>'), ('Fri Feb 25','React: Sending Data from Child to Parent','<p>How to send data from a child component to a parent component in React.</p><p><strong>In App.Js (Parent): </strong></p><ul><li>Create a state</li><li>Create a function that can alter that state, which accepts a parameter (we will send data back up from the child as the parameter). </li><li>Bind this state-altering function to the child component in the return area of the parent app. Now it can be accepted as a prop in the child component. </li></ul><p><strong>In Child.js</strong></p><ul><li>Accept the parent&#x27;s function as a prop or destructure it in the parameter area of the child component ()</li><li> Set a state in the child to store / keep track of the data you want to send to the parent.</li><li>Add an onChange function that alters the state to store the data you want to send back up to the parent (onChange will track and store the changes in an input form, for example).</li><li>Add a handleSubmit function that is triggered when the form or data is submitted in the child component. In handle submit, call the function sent as a prop from the parent and send the data collected (and recorded in the child&#x27;s state) as its parameter.</li></ul>'), ('Mon Feb 28','How To Loop Through An Array','<p>Imagine you have an array of numbers.</p><p>let numberArray = [1, 2, 3, 4, 5]</p><p>For whatever reason, you want to loop through these numbers.</p><p><em><strong>Take these steps:</strong></em></p><p>Use a for loop with the following conditions</p><ul><li>Start the for loop at 0, have it run for as long as it is less than the length of the array, and at each iteration add one</li><li>Now you can access every element in the array by accessing it and its index with the following: numberArray[i] --&gt; because I starts at 0 (giving you access to the element and index 0) and increases on each loop</li></ul><p><strong>The code would look like this:</strong></p><p>let numberArray = [1, 2, 3, 4, 5]<br/>for (let i = 0; i &lt; numberArray.length; i++) {<br/> console.log(numberArray[i]<br/>     };</p>');";
  con.query(teachATopicSQL, function (err, result) {
    if (err) throw err;
    console.log("Table creation `teach_a_topic` was successful!");
    console.log("Closing...");
  });

  con.end();
});
