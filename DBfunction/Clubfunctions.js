var ClubModel = require('../models/Club');
//const { Db } = require('mongodb');
//const db = require('./DBfunction/DBconnection').db;

var getAll = async (request, response) => {
    try {
        var result = await ClubModel.find().exec();
        response.send(result);
    } catch (error) {
        response.status(500).send(error);
    }
};

var getClub = async (request, response) => {
    try {
        var club = await ClubModel.findById(request.params.id).exec();
        response.send(club);
    } catch (error) {
        response.status(500).send(error);
    }
};

var getBest = async (request, response) => {
    try {
        var MongoClient = require('mongodb').MongoClient;
        var url = "mongodb://localhost:27017/Hafifa2";



        const pipeline = [
            {
                '$sort': {
                    'name': 1
                }
            }
        ]

        var x = MongoClient.connect(url, 
            async function (db) {
            var result = db.db("Hafifa2").collection("clubs").aggregate(pipeline);

            await result.forEach(club => {
                console.log(`${club._id}`);
            });
            
            return result;
        });

        response.send(x);


        // var mongoose = require('mongoose');
        // mongoose.connect('mongodb://localhost:27017/Hafifa2', { useNewUrlParser: true });

        // var db = mongoose.connection;
        // var x = db.db("Hafifa2").collection("clubs").aggregate(
        //     [
        //         { $group: { "_id": club.name, "count": { "$sum": 1 } } }
        //     ]
        // );


        
        // var clubList = await ClubModel.find().exec();
        // let womenAvgs = [];
        // clubList.forEach(club => womenAvgs.push(club.women.reduce((total, next) => total + next.cool, 0) / club.women.length));
        // response.send(`The best club is : ${clubList[womenAvgs.indexOf(Math.max(...womenAvgs))].name}`);

    } catch (error) {
        response.status(500).send(error);
    }
};

var postClub = async (request, response) => {
    try {
        var club = new ClubModel(request.body);
        var result = await club.save();
        response.send(result);
    } catch (error) {
        response.status(500).send(error);
    }
};

var deleter = (value, array) => {
    const index = array.indexOf(value);
    if (index > -1) {
        array.splice(index, 1);
        console.log(array);

        return array;
    }
}

// make a Shiduch in a certain club 
var Shiduch = async (request, response) => {
    try {
        var club = await ClubModel.findById(request.params.id).exec();

        var groom = club.men.find(man).where(man.awesome > 6);
        var pride = club.women.find(woman).where(woman.cool > 6);

        club.men = deleter(groom, club.men);
        club.women = deleter(pride, club.women);

        club.save();

        response.send(`MAZAL TOV !! \r\n to ${groom.name} and ${pride.name} \r\n have a wonderful life together :) `);
    } catch (error) {
        response.status(500).send(error);
    }
};

//add man 
var addMan = async (request, response) => {
    try {
        var club;
        var man = request.body;
        club.findByIdAndUpdate(request.params.id, { men: men.push(man) }, callback);

        var result = await club.save();
        response.send(result);
    } catch (error) {
        response.status(500).send(error);
    }
};

//add woman
var addWoman = async (request, response) => {
    try {
        var club;
        var woman = request.body;
        club.findByIdAndUpdate(request.params.id, { women: women.push(woman) }, callback);
        var result = await club.save();
        response.send(result);
    } catch (error) {
        response.status(500).send(error);
    }
};

module.exports = {
    getAll: getAll,
    getClub: getClub,
    getBest: getBest,
    postClub: postClub,
    Shiduch: Shiduch,
    addMan: addMan,
    addWoman: addWoman
};
