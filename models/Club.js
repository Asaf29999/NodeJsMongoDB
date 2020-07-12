var mongoose = require('../Mongoos');
var ManSchema = require('../models/Man').ManSchema;
var WomanSchema = require('../models/Woman').WomanSchema;

var ClubSchema = new mongoose.Schema({
    name: String,
    location: String,
    type: String,
    men: [ManSchema],
    women: [WomanSchema]
});

const ClubModel = mongoose.model('Club', ClubSchema);

module.exports = ClubModel;