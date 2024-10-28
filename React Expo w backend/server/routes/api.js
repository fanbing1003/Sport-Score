const express = require("express");
const router = express.Router();

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


router.post("/signup", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  if (!email || !password) {
    res.status(400).json({
      error: true,
      message: "Request body incomplet - email and password needed",
    });

    return;
  }

  const queryUsers = req.db("account").select("*").where("email", "=", email);
  console.log(queryUsers);
  queryUsers
    .then((users) => {
      if (users.length > 0) {
        console.log("User already Exists");
        throw new Error("User already exists");
        return;
      }

      const saltRounds = 5;
      const hash = bcrypt.hashSync(password, saltRounds);
      console.log(hash)
      return req.db.from("account").insert({ email, password:hash });
    })
    .then(() => {
      res.status(201).json({ error: false, message: "User created" });
    })
    .catch((err) => {
      res.status(400).json({ error: true, message: err.message });
    });
});

router.post("/login", function (req, res) {
  const email = req.body.email;
  const password = req.body.password;
  console.log(email)
  if (!email || !password) {
    res.status(400).json({
      error: true,
      message: "Request body incomplete - email and password needed",
    });
    return;
  }

  const queryUsers = req.db
    .from("account")
    .select("*")
    .where("email", "=", email);

  queryUsers
    .then((users) => {
      if (users.length === 0) {
        throw new Error("User does not exist");
      }

      const user = users[0];

      return bcrypt.compare(password, user.password);
    })
    .then((match) => {
      if (!match) {
        throw new Error("Passwords do not match");
      }

      const secretKey = "secret key";
      const expires_in = 60 * 60 * 24;

      const exp = Date.now() + expires_in * 1000;
      const token = jwt.sign({ email, exp }, secretKey);
      res.json({ token_type: "Bearer", token, expires_in, message: "Success" });
    })
    .catch((err) => {
      res.status(400).json({ error: true, message: err.message });
    });
});

module.exports = router;
