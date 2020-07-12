const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/Hafifa2', { useNewUrlParser: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
});

module.exports = mongoose;