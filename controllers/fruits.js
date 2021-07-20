const express = require("express");
const router = express.Router();
const Fruit = require("../models/mfruits.js");

// ROUTES => send is like VIEW, routes is like controller
// index => shows all the fruits
router.get("/", (req, res) => {
    //  res.send(fruits);
  // MONGO show all format////////////////////////
  Fruit.find({}, (error, fruits) => {
    res.render("index", {fruits});
  });
  });
  
  router.get('/seed', (req,res) => {
    Fruit.remove({},(error,fruits) => {
      Fruit.create([
        {
          name: "apple",
          color: "red",
          readyToEat: true,
        },
        {
          name: "pear",
          color: "green",
          readyToEat: false,
        },
        {
          name: "banana",
          color: "yellow",
          readyToEat: true,
        },
      ],(error,fruits) => {
        res.redirect("/fruits");
      }
      )
    })
  })
  
  
  ///////////////////////////////////////////////////////////////////////
  // post => create a new fruit
  router.post("/", (req, res) => {
  
    if (req.body.readyToEat === "on") {
      // if checked, req.body.readyToEat is set to 'on'
      req.body.readyToEat = true;
    } else {
      // if not checked, req.body.readyToEat is undefined
      req.body.readyToEat = false;
    }
  // req.body = {name: "durian"}
    Fruit.create(req.body, (error, createdFruit) => {
      console.log("Created Fruit", createdFruit);
      res.redirect("/fruits");
    });
   
  });
  
  
  router.get("/new", (req, res) => {
    res.render("new");
  });
  
  // AUthenticate - need this to put in the isAuthenticate
  const isAuthenticated = (req, res, next) => {
    if (req.session.currentUser) {
      return next();
    } else {
      res.redirect("/sessions/new");
    }
  };


  /////////////////////// MONGO READ////////////////////////
  // may not want to include all to be authenticated
  // router.get("/:id", isAuthenticated, (req, res) => {
    router.get("/:id", isAuthenticated, (req, res) => {
    // after you login, the code in session give you a session current User id, and can login. putting isAuthenticated above is equal to the below lines of code
   // if (!req.session.currentUser){
  //    res.redirect('/fruits')
  //  }
    const pos = req.params.id;
    Fruit.findById(pos, (error,fruit) => {
     res.render("show",{fruit,pos});
    })
   
  });

  
   ///////////// MONGO DELETE version
   router.delete('/:id', (req, res) => {
    Fruit.findByIdAndRemove(req.params.id, (err,fruit) => {
      res.redirect("/fruits");
    }
      )
   });
  
   //////// NORMAL UPDATE///////////////////////
   
  
   /////////////// MONGO UPDATE///////////////////
   router.put('/:id', (req, res) => {
  const {id}  = req.params; // another to pluck params 
   const fruit = {...req.body, readyToEat: req.body.readyToEat === 'on' }
  
   Fruit.findByIdAndUpdate(id,fruit,{new:true},(err,fruit) => {
    res.redirect("/fruits");
   }
   )
   });
  

  
   //////// MONGO EDIT///////////////////
   //// show edit form route => show edit form
   router.get('/:id/edit', (req, res) => {
   const pos = req.params.id;
   Fruit.findById(pos,(error,fruit) => {
     res.render("edit",{fruit,pos})
   }
   )
   });
   
module.exports = router;