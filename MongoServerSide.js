var MongoClient = require('mongodb').MongoClient;


//Create a database named "Hafifa2":
var url = "mongodb://localhost:27017/Hafifa2";
MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  console.log("Database created!");
  db.close();
});


//create collection
MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("Hafifa2");
    dbo.createCollection("Clubs", function(err, res) {
      if (err) throw err;
      console.log("Collection created!");
      db.close();
    });
  }); 


var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/Hafifa2', {useNewUrlParser: true});

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
});


var ManSchema = new Schema({ 
    name: String,
    age: Number,
    awesome: Number,
    pickUpLine: String 
});

var womanSchema = new Schema({ 
    name: String,
    age: Number,
    cool: Number,
    answer: String 
});

var ClubSchema = new mongoose.Schema({
    name: String,
    location: String,
    type: String,
    men:[ManSchema],
    women: [womanSchema]
  });

