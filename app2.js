// Dependencies // need tweet.js and app2.js for mongoose lesson
const mongoose = require("mongoose");
const Tweet = require("./tweet");

// Global configuration
const mongoURI = "mongodb://localhost:27017/tweets"; // database
const db = mongoose.connection;

// mongoose.connect(mongoURI); // connect to database (will be in somewhere else)

mongoose.connect(
    mongoURI,
    { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }, // no need this also can
    () => {
      console.log("the connection with mongod is established");
    }
  );


  console.log(new Date(1971, 2, 13, 7, 47));
////////////////// CRUD => Create, Read (Find), Update, Delete////////

//////////////////// R - Read - Find, will find all ////////////////////
/* Tweet.find((err,tweets) => {
    console.log(tweets);
    db.close();
}) */
// Case sensitive for the title water search
// find based on criteria
/* Tweet.find({title:"Water"},"title body likes", (err,tweets) => {
    console.log(tweets);
    db.close();
})

Tweet.find({likes:{$gte: 20}},"title body likes", (err,tweets) => {
    console.log(tweets);
    db.close();
})

Tweet.find({likes:{$gt: 20}},"title body likes", (err,tweets) => {
    console.log(tweets);
    db.close();
})

// gt = greater than, gte >=, lt <
Tweet.find({likes:{$gt: 20}, title:"Organic"},"title body likes", (err,tweets) => {
    console.log(tweets);
    db.close();
}) */
/* 
Tweet.find({likes:{$gt: 20}, title:{ $con: "Org"}},"title body likes", (err,tweets) => {
    console.log(tweets);
    db.close();
}) */

////////////////////// Advanced Find ///////////////////////////////////
Tweet.find({ likes: { $gte: 20 } }, "title -_id")
  .limit(2)
  .sort("title")
  .exec((err, tweets) => {
    console.log(tweets);
    db.close();
  });

///////////////////////////////// D - Delete///////////////////////
/* Tweet.findOneAndRemove({ title: "Deep Thoughts" }, (err, tweet) => {
    if (err) {
      console.log(err);
    } else {
      console.log("This is the deleted tweet:", tweet);
    }
    db.close();
  });
 */

///////////////////////////// U- Update/////////////////////////////////
/* Tweet.findOneAndUpdate(
    { title: "Vespa" },     // crtieria to find
    { sponsored: true },    // what to update
    { new: true },          // options new tweet being passed in = true, false is old
    (err, tweet) => {       // call back
      if (err) {
        console.log(err);
      } else {
        console.log(tweet);
      }
      db.close();
    }
  );
 */
////////////////////////////// C - CREATE/////////////////////////////////
/* 
  const myFirstTweet = {
    title: "Deep Thoughts",
    body: "Friends, I have been navel-gazing",
    author: "Karolin",
  };

  Tweet.create(myFirstTweet, (error, tweet) => {
    if (error) {
      // if there is an error console log it
      console.log(error);
    } else {
      // else show us the created tweet
      console.log(tweet);
    }
    // get control of terminal back
    // else just use control c
    db.close();
  });

  const manyTweets = [
    {
      title: "Deep Thoughts",
      body: "Friends, I have been navel-gazing",
      author: "Karolin",
    },
    {
      title: "Sage Advice",
      body: "Friends, I am vegan and so should you",
      author: "Karolin",
      likes: 20,
    },
    {
      title: "Whole Reality",
      body:
        "I shall deny friendship to anyone who does not exclusively shop at Whole Foods",
      author: "Karolin",
      likes: 40,
    },
    {
      title: "Organic",
      body:
        "Friends, I have spent $2300 to be one of the first people to own an organic smartphone",
      author: "Karolin",
      likes: 162,
    },
    {
      title: "Confusion",
      body:
        "Friends, why do you just respond with the word `dislike`? Surely you mean to click the like button?",
      author: "Karolin",
      likes: -100,
    },
    {
      title: "Vespa",
      body:
        "Friends, my Vespa has been upgraded to run on old french fry oil. Its top speed is now 11 mph",
      author: "Karolin",
      likes: 2,
    },
    {
      title: "Licensed",
      body:
        "Friends, I am now officially licensed to teach yogalates. Like this to get 10% off a private lesson",
      author: "Karolin",
      likes: 3,
    },
    {
      title: "Water",
      body:
        "Friends, I have been collecting rain water so I can indulge in locally sourced raw water. Ask me how",
      author: "Karolin",
    },
  ];

  Tweet.insertMany(manyTweets, (error, tweets) => {
    if (error) {
      console.log(error);
    } else {
      console.log(tweets);
    }
    db.close();
  }); */