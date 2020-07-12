var WomanModel = require('../models/Woman').WomanModel;

var getWoman = async (request, response) => {
    try {
        var women = await WomanModel.findById(request.params.id).exec();
        response.send(person);
    } catch (error) {
        response.status(500).send(error);
    }
};

var getAllWomen = async (request, response) => {
    try {
        var result = await WomanModel.find().exec();
        response.send(result);
    } catch (error) {
        response.status(500).send(error);
    }
};

var postWoman = async (request, response) => {
    try {
        var women = new WomanModel(request.body);
        var result = await women.save();
        response.send(result);
    } catch (error) {
        response.status(500).send(error);
    }
};



module.exports = {
    getWoman: getWoman,
    getAllWomen: getAllWomen,
    postWoman: postWoman,
};