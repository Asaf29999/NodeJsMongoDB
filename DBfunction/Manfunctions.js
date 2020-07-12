var MenModel = require('../models/Man').ManModel;

var getMan = async (request, response) => {
  try {
    var person = await MenModel.findById(request.params.id).exec();
    response.send(person);
  } catch (error) {
    response.status(500).send(error);
  }
};

var getAllMen = async (request, response) => {
  try {
    var result = await MenModel.find().exec();
    response.send(result);
  } catch (error) {
    response.status(500).send(error);
  }
};

var postMan = async (request, response) => {
  try {
    var man = new MenModel(request.body);
    var result = await man.save();
    response.send(result);
  } catch (error) {
    response.status(500).send(error);
  }
};


module.exports = {
  getMan: getMan,
  getAllMen: getAllMen,
  postMan: postMan,
};