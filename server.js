
//server.js
'use strict'
//first we import our dependencies…
var express = require('express');
var Promise = require('bluebird');
var mongoose = Promise.promisifyAll(require('mongoose'));
// var mongoose = require();
mongoose.Promise = global.Promise;

var MongoClient = require('mongodb').MongoClient
  , Server = require('mongodb').Server;

var mongoClient = new MongoClient(new Server('localhost', 27017));
// mongoClient.open(function(err, mongoClient) {
//   var db1 = mongoClient.db("mydb");
//
//   mongoClient.close();
// });
var bodyParser = require('body-parser');
const Ideas = require('./model/ideas.js');
//and create our instances
var app = express();
var router = express.Router();
//set our port to either a predetermined port number if you have set
//it up, or 3001
var port = process.env.API_PORT || 3001;
const MONGODB_URI = 'mongodb://<alicepuisanlai>:<Short7apples!>@ds133932.mlab.com:33932/loveisdb';
mongoose.connect('mongodb://localhost/loveis');
// mongoose.connect(MONGODB_URI);
// MongoClient.connect(MONGODB_URI);
//now we should configure the API to use bodyParser and look for
//JSON data in the request body
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//To prevent errors from Cross Origin Resource Sharing, we will set
//our headers to allow CORS with middleware like so:
app.use(function(req, res, next) {
 res.setHeader('Access-Control-Allow-Origin', '*');
 res.setHeader('Access-Control-Allow-Credentials', 'true');
 res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
 res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
//and remove cacheing so we get the most recent comments
 res.setHeader('Cache-Control', 'no-cache');
 next();
});
//now we can set the route path & initialize the API
router.get('/', function(req, res) {
 res.json({ message: 'AP Initialized!'});
});
//adding the /comments route to our /api router
router.route('/ideas')
 //retrieve all comments from the database
 .get(function(req, res) {
   //looks at our Comment Schema
   Ideas.find(function(err, ideas) {
     if (err)
     res.send(err);
     //responds with a json object of our database comments.
     res.json(ideas)
   });
 })
 //post new comment to the database
 .post(function(req, res) {
    var idea = new Ideas();
    //body parser lets us use the req.body
    idea.content = req.body.content;
    idea.name = req.body.name;
    idea.save(function(err) {
       if (err)
         res.send(err);
         res.json({ message: 'Idea successfully added!' });
       });
 });

router.route('/ideas/:idea_id')

  .put((req, res) => {
    console.log('put')

    Ideas.findById(req.params.idea_id, (err, idea) => {
      if (err) {
        res.send(err);
      }
      (req.body.content) ? idea.content = req.body.content : null;
      (req.body.name) ? idea.name = req.body.name : null;
      idea.save(err => {
        if (err) {
          res.send(err);
          res.json({ message: "Idea has been updated!"})
        }
      })
    });
  })
  .delete((req, res) => {
    console.log('delete')
    Ideas.remove({ _id: req.params.idea_id }, (err, idea) => {
      if (err) {
        res.send(err);
        res.json({ message: "Idea has been deleted!"});
      }
    })
  })
//Use our router configuration when we call /api
app.use('/api', router);
//starts the server and listens for requests
app.listen(port, function() {
 console.log(`api running on port http://localhost:${port}/api`);
});
