/* eslint-disable no-undef */
function search(query, cb) {
  return fetch(`api/food?q=${query}`, {
    accept: 'application/json',
  }).then(checkStatus)
    .then(parseJSON)
    .then(cb);
}

function getLists( cb){
  return fetch( 'api/lists', {
    accept: 'application/json'
  }).then( checkStatus)
    .then( parseJSON)
    .then( cb);
}

function postList( list){
  fetch( '/api/list', {
    method: 'post',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify( list)
  }).then( function( response){
    console.log( "post list response:", response);
  })
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  const error = new Error(`HTTP Error ${response.statusText}`);
  error.status = response.statusText;
  error.response = response;
  console.log(error); // eslint-disable-line no-console
  throw error;
}

function parseJSON(response) {
  return response.json();
}

const Client = { search, getLists, postList };
export default Client;
