const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const app = express();

const port = process.env.PORT;
app.use(bodyParser.urlencoded({
  extended: true
}));

MongoClient.connect(process.env.MONGODB_URL, (err, database) => {
  if(err) {
    return console.log(err);
  }

  require('./app/routes')(app, database);

  app.listen(port, () => {
    console.log('API live on ' + port);
  });
})
