/**
 * FIXME: do we need to sanitize anything?
 */
const express = require('express');
const moment  = require( 'moment');
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectID;
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

/* pass mongo down
app.use(function(req, res, next) {
  req.db = {};
  req.db.tasks = db.collection('tasks');
  next();
});
*/
app.use( bodyParser.json());

app.get('/api/food', (req, res) => {
  // replace re special chars
  const param = req.query.q.replace( /([.?*+^$[\]\\(){}|-])/g, "\\$1");
  // allow fetch all
  let search = {};
  if (param) {
    search = { name: new RegExp( ".*"+param+".*", 'i')};
  }

  db.collection( 'foods').find( search)
  .toArray( function( err, items){
    res.json( items);
  });
});

app.post( '/api/food', (req,res) => {
  const food = req.body;
  db.collection( 'foods').findOne( { name: food.name, units: food.units})
  .then( function( results){
    if( results === null){
      db.collection( 'foods').insertOne( food)
      .then( function( results){
        res.json( results);
      });
    } else {
      res.json( results);
    }
  });
});

app.put( '/api/food', (req, res) => {
  const food = req.body;
  let promises = [];
  promises.push( new Promise( function( resolve, reject){
    db.collection( 'foods').findOneAndUpdate(
      { name: food.name, units: food.units},
      { $set: { name: food.new_name}},
      { upsert: true}
    ).then( function( results){
      resolve( results);
    });
  }));
  // now update all the foods matching in all the lists
  promises.push(
    new Promise( function( resolve, reject){
      db.collection( 'shoppinglists').find( {}).toArray()
      .then( function( lists){
        let total = 0;
        lists.forEach( function( list, ndx, lists_array){
          let count = 0;
          list.selectedFoods.forEach( function( fooditem){
            if( fooditem.name === food.name){
              fooditem.name = food.new_name;
              count += 1;
            }
          });
          if( count){
            total += count;
            console.log( "saving updates for list:", list.created);
            // FIXME: deprecated
            db.collection( 'shoppinglists').save( list);
          }
          if( ndx === lists_array.length -1){
            console.log( "selectedFoods update finished, total update:", total);
            resolve( {message: "selectedFoods updated"});
          }
        });
        // TODO: shouldn't this work?
        // db.collection( 'shoppinglists').updateMany(
        //   { selectedFoods$name: food.name},
        //   { $set: {selectedFoods$name:food.new_name}}
        // ).then( function( results){
        //   resolve( results);
        // });
      });
    })
  );
  Promise.all( promises).then( function( allresults){
    res.json( allresults);
  });
});

app.get( '/api/lists', (req, res) => {
  db.collection( 'shoppinglists').find().sort( { created: -1})
  .toArray( function( err, items){
    res.json( items);
  });
});

app.post( '/api/list', (req, res) => {
  const list = req.body;
  list.created = new Date( list.created);
  db.collection( 'shoppinglists').findOneAndReplace(
    { created: list.created},
    list,
    { upsert: true}
  ).then( function( results){
    res.json( results);
  });
});

app.delete( '/api/list', (req, res) => {
  const {created} = req.body;
  console.log( "delete list created:", created);
  db.collection( 'shoppinglists').findOneAndDelete({ created: created})
  .then( (results) => {
    res.json( results);
  });
});

app.listen(app.get('port'), () => {
  console.log(`Find the server at: http://localhost:${app.get('port')}/`); // eslint-disable-line no-console
});
