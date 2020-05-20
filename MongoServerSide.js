var MongoClient = require('mongodb').MongoClient;


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


var ManSchema = new mongoose.Schema({
  name: String,
  age: Number,
  awesome: Number,
  pickUpLine: String
});

var womanSchema = new mongoose.Schema({
  name: String,
  age: Number,
  cool: Number,
  answer: String
});

var ClubSchema = new mongoose.Schema({
  name: String,
  location: String,
  type: String,
  men: [ManSchema],
  women: [womanSchema]
});

const MenModel = mongoose.model('Men', ManSchema);
const WomenModel = mongoose.model('Women', womanSchema);
const ClubModel = mongoose.model('Club', ClubSchema);



const Express = require("express");
const BodyParser = require("body-parser");

var app = Express();

app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));









app.post("/men", async (request, response) => {
  try {
    var man = new MenModel(request.body);
    var result = await man.save();
    response.send(result);
  } catch (error) {
    response.status(500).send(error);
  }
});
app.get("/men", async (request, response) => {
  try {
    var result = await MenModel.find().exec();
    response.send(result);
  } catch (error) {
    response.status(500).send(error);
  }
});
app.get("/men/:id", async (request, response) => {
  try {
    var person = await MenModel.findById(request.params.id).exec();
    response.send(person);
  } catch (error) {
    response.status(500).send(error);
  }
});
app.put("/men/:name", async (request, response) => { });
app.delete("/men/:name", async (request, response) => { });












app.post("/women", async (request, response) => {
  try {
    var women = new WomenModel(request.body);
    var result = await women.save();
    response.send(result);
  } catch (error) {
    response.status(500).send(error);
  }
});
app.get("/women", async (request, response) => {
  try {
    var result = await WomenModel.find().exec();
    response.send(result);
  } catch (error) {
    response.status(500).send(error);
  }
});
app.get("/women/:id", async (request, response) => {
  try {
    var person = await WomenModel.findById(request.params.id).exec();
    response.send(person);
  } catch (error) {
    response.status(500).send(error);
  }
});
app.put("/women/:name", async (request, response) => { });
app.delete("/women/:name", async (request, response) => { });













app.post("/club", async (request, response) => {
  try {
    var club = new ClubModel(request.body);
    var result = await club.save();
    response.send(result);
  } catch (error) {
    response.status(500).send(error);
  }
});
app.get("/club", async (request, response) => {
  try {
    var result = await ClubModel.find().exec();
    response.send(result);
  } catch (error) {
    response.status(500).send(error);
  }
});

app.get("/club/best", async (request, response) => {
  try {
    var clubList = await ClubModel.find().exec();
    let womenAvgs = [];
    clubList.forEach(club => womenAvgs.push(club.women.reduce((total, next) => total + next.cool, 0) / club.women.length));
    response.send( `The best club is : ${clubList[womenAvgs.indexOf(Math.max(...womenAvgs))].name}`);

  } catch (error) {
    response.status(500).send(error);
  }
});

app.get("/club/:id", async (request, response) => {
  try {
    var club = await ClubModel.findById(request.params.id).exec();
    response.send(club);
  } catch (error) {
    response.status(500).send(error);
  }
});


var deleter = (value, array) => {
  const index = array.indexOf(value);
  if (index > -1) {
    array.splice(index, 1);
    console.log(array);
    
    return array;
  }
}

// make a Shiduch in a certain club 
app.get("/club/:id/Shiduch", async (request, response) => {
  try {
    var club = await ClubModel.findById(request.params.id).exec();

    var groom = club.men.find(man => man.awesome > 6);
    var pride = club.women.find(woman => woman.cool > 6);

    club.men = deleter(groom, club.men);
    club.women = deleter(pride, club.women);

    club.save();

    response.send(`MAZAL TOV !! \r\n to ${groom.name} and ${pride.name} \r\n have a wonderful life together :) `);
  } catch (error) {
    response.status(500).send(error);
  }
});

//add man 
app.put("/club/:id/men/:menid", async (request, response) => {
  try {
    var club = await ClubModel.findById(request.params.id).exec();
    var man = await MenModel.findById(request.params.menid).exec();
    club.men.push(man);
    var result = await club.save();
    response.send(result);
  } catch (error) {
    response.status(500).send(error);
  }
});

//add woman
app.put("/club/:id/women/:womenid", async (request, response) => {
  try {
    var club = await ClubModel.findById(request.params.id).exec();
    var woman = await WomenModel.findById(request.params.womenid).exec();
    club.women.push(woman);
    var result = await club.save();
    response.send(result);
  } catch (error) {
    response.status(500).send(error);
  }
});
app.delete("/club/:name", async (request, response) => { });

app.listen(3000, () => {
  console.log("Listening at :3000...");
});