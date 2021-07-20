//config - DOTENV
require("dotenv").config();
const express = require("express");
// const fruits = require("./models/fruits");
const mongoose = require("mongoose");
 // const Fruit = require("./models/mfruits");
const marsMissions = require("./models/marsMission");
const bakedgoods = require("./models/bakedgoods");
const app = express();
//config - DOTENV
const PORT = process.env.PORT;
//include the method-override package
const methodOverride = require("method-override");
const MONGODB_URI = process.env.MONGODB_URI;
const userController = require("./controllers/users.js")
const fruitsController = require("./controllers/fruits.js");
const sessionController = require("./controllers/sessions.js");
const session = require("express-session");

// CONFIG (CONNECTIONS) - MONGODB
//... and then farther down the file
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false
},() => {
  console.log("the connection with mongod is established");
});

//MIDDLEWARE (BEFORE CONTROLLERS)
app.use(express.urlencoded({ extended: false })); // if you want to use forms, then need this, if not req.body will not be defined
app.use(methodOverride("_method")); // when click, the url is sent in from form action, the methodoverride will not read the POST but instead use the DELETE of _method
app.use(express.static('public'));
app.use(
  session({
    secret: process.env.SECRET, //a random string do not copy this value or your stuff will get hacked
    resave: false, // default more info: https://www.npmjs.com/package/express-session#resave
    saveUninitialized: false, // default  more info: https://www.npmjs.com/package/express-session#resave
  })
);

//CONTROLLERS
app.use('/fruits', fruitsController);
app.use('/users', userController);
app.use('/sessions', sessionController);
app.set('view engine', 'ejs');

// CONFIGURATION
// NOTES
// ejs is a file that has text and <> in it
// localStorage
// create a localst.js in public folder
// in localst.js => console.log(localStorage) .js is HTML mainly for backend engineers
// then in index.ejs <script src="/js/storage.js></script>"
// app.get("/budgets/js",res.render("store.ejs")
// then in store.ejs console.log(localStorage)
// ejs generate text - it is JS mainly for backend engineers... do it within storage.js , set items and get items
// near the top, around other app.use() calls
// app.use(express.urlencoded({ extended: false })); // if you want to use forms, then need this, if not req.body will not be defined
// when you send a url, you have a header and a body.
// if you did not include the above body parser, it will discard the body
// can try this in here or in insomnia, but response will only appear one place (or browser)
// app.use(express.static('public'));
//...
//after app has been defined
//use methodOverride.  We'll be adding a query parameter to our delete form named _method
// app.use(methodOverride("_method")); // when click, the url is sent in from form action, the methodoverride will not read the POST but instead use the DELETE of _method
// if did not install the overrider and above depend and config, and put in the _method=DELETE, then it will be a only a GET
// 'DATA'
// const fruits = ["apple", "banana", "pear"];
/* const fruits = [
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
  ]; */

// ROUTES => send is like VIEW, routes is like controller
// index => shows all the fruits
// *app.get("/fruits", (req, res) => {
  //  res.send(fruits);
// MONGO show all format////////////////////////
// *Fruit.find({}, (error, fruits) => {
// *  res.render("index", {fruits});
// *});
// *});

// *app.get('/fruits/seed', (req,res) => {
 // * Fruit.remove({},(error,fruits) => {
   // * Fruit.create([
     // * {
    // *    name: "apple",
   // *     color: "red",
   // *     readyToEat: true,
   // *   },
  // *    {
  // *      name: "pear",
  // *      color: "green",
  // *      readyToEat: false,
  // *    },
  // *    {
  // *      name: "banana",
  // *      color: "yellow",
  // *      readyToEat: true,
   // *   },
  // *  ],(error,fruits) => {
   // *   res.redirect("/fruits");
  // *  }
// *    )
// *  })
// *})

  //// comment for MONGO section, needed if no MONGO/////
  ////// react way/////
  /* let result = "";
  for (const [index, fruit] of fruits.entries()) {
    result += `<li>${fruit.name} <a href='http://localhost:3000/fruits/${index}'>${fruit.name}</a></li>`;
  } */

  //react way
   // <ol><%- result%></ol>

  ///// backend way//////
  /* res.render("index.ejs", {
    fruits,
    result,
  }); */
//});
///////////////////////////////////////////////////////////////////////
// post => create a new fruit
// *app.post("/fruits", (req, res) => {
  /* console.log("Create working");
  res.send("OK works"); */
  // console.log("Req.body is: ", req.body); // url encoder changes the inputs from curl and put it in req.body, if not declare above, req.body will be undefined
  // res.send(req.body);

 // * if (req.body.readyToEat === "on") {
    // if checked, req.body.readyToEat is set to 'on'
 // *   req.body.readyToEat = true;
 // * } else {
    // if not checked, req.body.readyToEat is undefined
 // *   req.body.readyToEat = false;
 // * }
// req.body = {name: "durian"}
// *  Fruit.create(req.body, (error, createdFruit) => {
 // *   console.log("Created Fruit", createdFruit);
 // *   res.redirect("/fruits");
 // * });
 // due to MONGO, comment this out fruits.push(req.body);
 /*  console.log(fruits);
 console.log("hi");
  res.send(req.body); */
// *});

// curl -X POST localhost:3000/fruits => post -> simulates what form is doing, needs the urlencoded to combine spaces to + etc
// curl localhost:3000/fruits  => get
//curl -X POST -d name="dragon fruit" localhost:3000/fruits

// NEW route => show form
// by standard, if you have form, and there is action path, 
// if the method is GET in the form, will take contents of form and insert into the url as 
// query string /fruits?name=&color= and go to fruits page
// if the method is POST, it will do a post (update)
// put this above your show.ejs file
// *app.get("/fruits/new", (req, res) => {
// *  res.render("new");
// *});

// show route => show 1 fruit
// route uses :id => extract using req.params
// NORMAL EXAMPLE READ
//app.get("/fruits/:id", (req, res) => {
//  const pos = req.params.id;
  // res.send(fruits[pos]);
//  const fruit = fruits[pos];
  //  res.render("show.ejs",{name:'simon', age:88}); // look for file in views(impt!) folder.. default is views folder as name
////  res.render("show.ejs", { fruit,pos });
// });

/////////////////////// MONGO READ////////////////////////
// *app.get("/fruits/:id", (req, res) => {
// *  const pos = req.params.id;
// *  Fruit.findById(pos, (error,fruit) => {
 // *  res.render("show",{fruit,pos});
 // * })
  //  res.render("show.ejs",{name:'simon', age:88}); // look for file in views(impt!) folder.. default is views folder as name
 // res.render("show.ejs", { fruit,pos });
// *});


// *delete route => delete 1 fruit
/* app.delete('/fruits/:index', (req, res) => {
  fruits.splice(req.params.index, 1); //remove the item from the array
  res.redirect('/fruits');  //redirect back to index route
 }); */

 ///////////// MONGO DELETE version
 // *app.delete('/fruits/:id', (req, res) => {
// *  Fruit.findByIdAndRemove(req.params.id, (err,fruit) => {
// *    res.redirect("/fruits");
 // * }
 // *   )
 // *});

 //////// NORMAL UPDATE///////////////////////
 //app.put('/fruits/:id', (req, res) => {
 // const {id}  = req.params; // another to pluck params 
 //  fruits[id].name = "durian";
// fruits[id].name = req.body.name;
 //fruits[id].color = req.body.color;
// fruits[id].readyToEat = req.body.readyToEat === 'on';
// res.redirect("/fruits/");
 //  res.send("putting");
  //res.render("edit.ejs");
 //});

 /////////////// MONGO UPDATE///////////////////
 // *app.put('/fruits/:id', (req, res) => {
// *const {id}  = req.params; // another to pluck params 
 // *const fruit = {...req.body, readyToEat: req.body.readyToEat === 'on' }
 /* fruits[id].name = req.body.name;
 fruits[id].color = req.body.color;
 fruits[id].readyToEat = req.body.readyToEat === 'on'; */
 // *Fruit.findByIdAndUpdate(id,fruit,{new:true},(err,fruit) => {
 // * res.redirect("/fruits/");
 // *}
 // *)
 // *});



 // *show edit form route => show edit form
// app.get('/fruits/:id/edit', (req, res) => {
  // res.send("editing");
 // res.render("edit.ejs");
// const pos = req.params.id;
 // res.send(fruits[pos]);
// const fruit = fruits[pos];
 //  res.render("show.ejs",{name:'simon', age:88}); // look for file in views(impt!) folder.. default is views folder as name
// res.render("edit.ejs", { fruit,pos });
// });

 //////// MONGO EDIT///////////////////
 //// show edit form route => show edit form
 // *app.get('/fruits/:id/edit', (req, res) => {
 // *const pos = req.params.id;
 // *Fruit.findById(pos,(error,fruit) => {
 // *  res.render("edit",{fruit,pos})
 // *}
 // *)
 // *});
 

///////////////////w7d3 Morning lab Biscoff Bakery////////////////////
app.get("/bakedgoods/", (req, res) => {
 
  ///// backend way//////
res.render("index1.ejs", {
bakedgoods
  });
});

app.get("/bakedgoods/form", (req, res) => {
  res.render("form.ejs");
});

app.get("/bakedgoods/:id", (req, res) => {
  const pos = req.params.id;
  const bakedgood = bakedgoods[pos];
  res.render("show1.ejs", { bakedgood });
});

app.post("/bakedgoods", (req, res) => {
  console.log(req.body);
  bakedgoods.push(req.body);
  console.log(bakedgoods);
  res.redirect("/bakedgoods");
});

////////////////////////////////////////////////////////////////////////

/////////////// Mars Mission////////////////////////////////////////
// * Your mission is to complete the app
// * The app will need routes for index and show
// * The app will need views for index and show
//
// * Make it so you can click on a mission’s name on the index page, and be taken to that mission’s show page
// * Bonus: add images to the data and have them display
// * Bonus: add static css to style the pages

// NOTES:
// ejs has not been installed - install it!
// views folder has not been created - create it!
// views/missions folder has not been created create it!

// INDEX Route
// send data to 'missions/index.ejs' view
// the view should display just the names of each mission
// Stretch: the names should provide a link to the show page

app.get("/missions/", (req, res) => {
  ///// backend way//////
  res.render("./missions/index.ejs", {
    marsMissions,
  });
});

// SHOW Route
// send data to 'missions/show.ejs' view
// the view should display all the data for a single mission
// the view should have a link back to the index
// Stretch: display the image inside an image tag

app.get("/missions/:id", (req, res) => {
  const pos = req.params.id;
  // res.send(fruits[pos]);
  const mission = marsMissions[pos];
  //  res.render("show.ejs",{name:'simon', age:88}); // look for file in views(impt!) folder.. default is views folder as name
  res.render("./missions/show.ejs", { mission });
});


////////////////////////////W7D4 Exobiology I////////////////////////////////
const scientists = [];

app.get("/newexo1/", (req, res) => {
 // res.send('this is the new route');
 res.render("newexo1.ejs");
});


app.post("/create", (req, res) => {
  console.log(req.body);
  scientists.push(req.body);
  res.redirect("/index");
 // res.send(req.body);
});

app.get("/index", (req, res) => {
  res.render("indexexo1.ejs", {
    scientists
  });
});

app.delete('/index/:index', (req, res) => {
  scientists.splice(req.params.index, 1); //remove the item from the array
  res.redirect('/fruits');  //redirect back to index route
 });

app.listen(PORT, () => {
  console.log("Missions to Mars running on port: ", PORT);
});

/* 
app.listen(PORT, () => {
    console.log("app is running on port:", PORT);
  });
 */

/* equiv es6 way change server.js to server.mjs to use new way
OR in package.json
import express from 'express';
import fruits from './models/fruits';
const app = express();

app.get("/fruits/", (req,res) => {
  res.send(fruits);
})

app.listen(3000)

*/

// curl -X POST -G "_method=DELETE" localhost:3000/fruits/1
