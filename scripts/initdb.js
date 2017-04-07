const fs = require('fs');
const parse = require('csv-parse')
const MongoClient = require('mongodb').MongoClient;

const url = 'mongodb://localhost:27017/foods';
MongoClient.connect(url, function(err, dbc) {
  if( err){
    console.log( "mongo connect error:", err);
  } else {
    console.log( "connected to mongo");
    populateDB( dbc);
  }
});

function populateDB( db){
  fs.readFile( 'food.csv', function( err, data){
    parse( data, {columns:true, trim:true}, function( err, rows){
      const foods = db.collection('foods');
      foods.remove({})
      .then( function( res){
        foods.insert( rows)
        .then( function( results){
          console.log( "food list results:", results);
          db.close();
        })
        .catch( function( err){
          console.error( "food list failed:", err);
          db.close();
        });
      })
      .catch( function( err){
        console.log( "removed failed:", err);
        db.close();
      });
    });
  });
}
