const e = require("express");
const express = require("express");
const bcrypt = require("bcrypt-nodejs");
const cors = require("cors");
const app = express();
const knex = require("knex");
const register = require("./controllers/register");
const signin = require("./controllers/signin");
const profile = require("./controllers/profile");
const Image = require("./controllers/image");
const db = knex({
  client: "pg",
  connection: {
    host: "127.0.0.1",
    user: "sunpreet",
    password: "",
    database: "face-recog",
  },
});

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Success");
});
app.post("/signin", (req, res) => {
  signin.handleSignin(req, res, db, bcrypt);
});

app.post("/register", (req, res) => {
  register.handleRegister(req, res, db, bcrypt);
});

app.get("/profile/:id", (req, res) => {
  profile.handleProfileGet(req, res, db);
});

app.put("/image", (req, res) => {
  Image.handleImage(req, res, db);
});

// // Load hash from your password DB.
// bcrypt.compare("bacon", hash, function (err, res) {
//   // res == true
// });
// bcrypt.compare("veggies", hash, function (err, res) {
//   // res = false
// });

app.listen(3000, () => {
  console.log("first");
});

/*

/ - res = this is working
/signin -> POST = success/fail
/register -> POST = user
/profile/userid - GET = user
/image - PUT = user

*/
