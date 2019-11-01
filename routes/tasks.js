var express = require("express");
var router = express.Router();

const mongo = require('mongodb')
const MongoClient = mongo.MongoClient
const uri = "..."
var client;
var mongoClient = new MongoClient(uri, { reconnectTries :
Number.MAX_VALUE, autoReconnect : true, useNewUrlParser : true })
mongoClient.connect((err, db) => { // returns db connection
  if (err != null) {
    console.log(err)
    return
  }
  client = db
})

// Get All Tasks
router.get("/tasks", function(req, res, next) {
  const collection = client.db("test").collection("todos")
  collection.find().toArray(function(err, tasks) {
    if (err) {
      res.send(err);
    }
    res.json(tasks);
  });
});

//Save Task
router.post("/task", function(req, res, next) {
  const collection = client.db('test').collection('todos')
  var task = req.body;
  console.log(task);
  if (!task.name) {
    res.status(400);
    res.json({
      error: "Bad Data"
    });
  } else {
    collection.save(task, function(err, task) {
      if (err) {
        res.send(err);
      }
      res.json(task);
    });
  }
});

// Delete Task
router.delete("/task/:id", function(req, res, next) {
  const collection = client.db('test').collection('todos')
  collection.remove({ _id: mongo.ObjectId(req.params.id) }, function(
    err,task
  ) {
    if (err) {
      res.send(err);
    }
    res.json(task);
  });
});

module.exports = router;
