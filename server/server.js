const express = require('express');
const moment  = require( 'moment');
const MongoClient = require('mongodb').MongoClient;
// var ObjectId = require('mongodb').ObjectID;
const app = express();
const bodyParser = require('body-parser');

var db;
var url = 'mongodb://localhost:27017/foods';
MongoClient.connect(url, function(err, dbc) {
  if( err){
    console.log( "mongo connect error:", err);
  }
  db = dbc;
});


app.set('port', (process.env.PORT || 3001));

// Express only serves static assets in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
}

app.use( bodyParser.json());

app.get('/api/food', (req, res) => {
  const param = req.query.q;

  if (!param) {
    res.json({
      error: 'Missing required parameter `q`',
    });
    return;
  }

  db.collection( 'foods').find( { name: new RegExp( ".*"+param+".*", 'i')})
  .toArray( function( err, items){
    res.json( items);
  });
});

app.post( '/api/food', (req,res) => {
  const food = req.body;
  console.log( "adding food:", food);
});

app.listen(app.get('port'), () => {
  console.log(`Find the server at: http://localhost:${app.get('port')}/`); // eslint-disable-line no-console
});
