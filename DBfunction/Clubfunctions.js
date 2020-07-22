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
    const MongoClient = require('mongodb').MongoClient;
    const url = "mongodb://localhost:27017/Hafifa2";
    const client = new MongoClient(url);

    try {
        await client.connect();
        var result = await calculteAVG(client);
        resultArray = [];

        await result.forEach(club => {
            resultArray.push(club);
        });

        response.send(`The best club is : ${resultArray[0].name}`);
    }
    catch (error) {
        response.status(500).send(error);
    }
    finally {
        await client.close();
    }

    async function calculteAVG(client) {
        const pipeline = [
            {
                '$unwind': {
                    'path': '$women'
                }
            }, {
                '$group': {
                    '_id': '$_id',
                    'name': {
                        '$first': '$name'
                    },
                    'coolAVG': {
                        '$avg': '$women.cool'
                    }
                }
            }, {
                '$sort': {
                    'coolAVG': -1
                }
            }, {
                '$limit': 1
            }
        ];
        const aggCursor = client.db("Hafifa2").collection("clubs").aggregate(pipeline);

        return aggCursor;
    }


    // var clubList = await ClubModel.find().exec();
    // let womenAvgs = [];
    // clubList.forEach(club => womenAvgs.push(club.women.reduce((total, next) => total + next.cool, 0) / club.women.length));
    // response.send(`The best club is : ${clubList[womenAvgs.indexOf(Math.max(...womenAvgs))].name}`);

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
