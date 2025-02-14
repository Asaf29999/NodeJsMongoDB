var MongoClient = require('mongodb').MongoClient;

const ConnectDB= ()=>{
    
    //Create a database named "Hafifa2":
    var url = "mongodb://localhost:27017/Hafifa2";
    MongoClient.connect(url, function (err, db) {
      if (err) throw err;
      console.log("Database created!");
      db.close();
    });
    
    //create collection
    MongoClient.connect(url, function (err, db) {
      if (err) throw err;
      var dbo = db.db("Hafifa2");
      dbo.createCollection("Clubs", function (err, res) {
        if (err) throw err;
        console.log("Collection created!");
        db.close();
      });
    });
    
    var mongoose = require('mongoose');
    mongoose.connect('mongodb://localhost:27017/Hafifa2', { useNewUrlParser: true });
    
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function () {
    
    });

}    

module.exports.ConnectDB = ConnectDB;
//module.exports.db = db;