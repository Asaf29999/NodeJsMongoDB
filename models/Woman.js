var mongoose = require('../Mongoos');

const womanSchema = new mongoose.Schema({
    name: String,
    age: Number,
    cool: Number,
    answer: String
});
const WomanModel = mongoose.model('Woman', womanSchema);

module.exports.WomanModel = WomanModel;
module.exports.WomanSchema = womanSchema;

