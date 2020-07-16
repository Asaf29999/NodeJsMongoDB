var mongoose = require('../Mongoos');

const ManSchema = new mongoose.Schema({
  name: String,
  age: Number,
  awesome: Number,
  pickUpLine: String
});

const ManModel = mongoose.model('Man', ManSchema);

module.exports.ManModel = ManModel;
module.exports.ManSchema = ManSchema;
