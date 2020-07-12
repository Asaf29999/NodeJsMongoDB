const ConnectDB = require('./DBfunction/DBconnection');
const listener = require('./DBfunction/Listener');

ConnectDB();

const Express = require("express");
const BodyParser = require("body-parser");
var app = Express();

app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));

listener.forEach(option => {
  app[option.Type](option.Url, option.Func);
});

app.listen(3000, () => {
  console.log("Listening at :3000...");
});