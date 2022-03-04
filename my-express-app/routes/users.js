var express = require("express");
var app = express.Router();
var jwt = require("jsonwebtoken");
// var userShouldBeLoggedIn = require("../guards/userShouldBeLoggedIn");
var db = require("../model/helper");
require("dotenv").config();
var bcrypt = require("bcrypt");
const saltRounds = 10;

const supersecret = process.env.SUPER_SECRET;

app.post("/register", async (req, res) => {
  const { email, password } = req.body;

  try {
    const hash = await bcrypt.hash(password, saltRounds);

    await db(
      `INSERT INTO users (email, password) VALUES ("${email}", "${hash}")`
    );

    res.send({ message: "Register successful" });
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const results = await db(`SELECT * FROM users WHERE email = "${email}"`);
    const user = results.data[0];
    if (user) {
      const user_id = user.id;

      const correctPassword = await bcrypt.compare(password, user.password);

      if (!correctPassword) throw new Error("Incorrect password");

      var token = jwt.sign({ user_id }, supersecret);
      res.send({ message: "Login successful, here is your token", token });
    } else {
      throw new Error("User does not exist");
    }
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});

// app.get("/profile", userShouldBeLoggedIn, (req, res) => {
//   res.send({
//     message: "Here is the PROTECTED data for user " + req.user_id,
//   });
// });

module.exports = app;
