const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const User = require("../models/users.js")


router.get("/", (req, res) => {
 res.send("users");

});

router.get("/new", (req, res) => {
    res.render("../views/newuser.ejs");
  });

  router.post("/", (req, res) => {
   // res.send(req.body);
//overwrite the user password with the hashed password, then pass that in to our database
    req.body.password = bcrypt.hashSync(    // HAshSync means  you hash and then you wait until things complete
    req.body.password,
    bcrypt.genSaltSync(10)
  );

    User.create(req.body, (error,user) => {
        console.log("user",user);
    //    if (user === undefined){
      //    res.render("../views/newuser.ejs");
      //  } else {
        res.redirect("/fruits")
      //};
    }
    )
  });


module.exports = router;