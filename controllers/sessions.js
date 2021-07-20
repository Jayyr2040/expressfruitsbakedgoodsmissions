const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/users.js");
// * /seesions/new => form to login

router.get("/new", (req, res) => {
  // res.send("sessions/login");
  res.render("../views/login.ejs");
  });

   router.post("/new", (req, res) => {
       User.findOne({username: req.body.username},(err,foundUser) => {
         console.log(req.body.username);
         console.log(req.body.password);
         console.log(foundUser.password);
         console.log(foundUser);
        if (err) {
            console.log(err);
            res.send("oops the db had a problem");       // internet not working or the server down
          } else if (!foundUser) {
            // if found user is undefined/null not found etc
            res.send('<a  href="/">Sorry, no user found </a>');
          } else if (bcrypt.compareSync(req.body.password, foundUser.password)) {
              // add the user to our session
              console.log("found user", foundUser);
              req.session.currentUser = foundUser;
              // redirect back to our home page
              console.log(req.body.password);
              res.redirect("/fruits");
            } else {
              // passwords do not match
              res.send('<a href="/"> password does not match </a>');
            }
          })

   });

     // logout
   router.delete("/", (req, res) => {
    req.session.destroy(() => {
      res.redirect("/fruits");
    });
  });

module.exports = router;