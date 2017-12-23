const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const app = express();

const url = process.env.MONGODB_URL || require('./config/db').url;

const port = process.env.PORT || 8000;

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(bodyParser.json());

MongoClient.connect(url, (err, database) => {
  if(err) {
    return console.log(err);
  }

  require('./app/routes')(app, database);

  app.listen(port, () => {
    console.log('API live on ' + port);
  });
})
