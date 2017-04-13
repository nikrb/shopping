import React from 'react';
import LocalDB from '../LocalDB';
import {browserHistory} from 'react-router';

export default class Shopping extends React.Component {
  state = {
    shopping_lists: []
  };
  componentWillMount = () => {
    console.log( "init local db");
    LocalDB.init()
    .then( () => {
      console.log( "local db init done, getall shopping lists");
      LocalDB.getAll()
      .then( (list) => {
        console.log( "shopping list:", this.state.shopping_lists);
        this.setState( { shopping_lists: list});
      });
    });
  };
  componentWillUnmount = () => {
    // console.log( "closing local db");
    // LocalDB.close();
  };
  newList = () => {
    console.log( "new list");
    browserHistory.push( { pathname: '/list', state: { list: {}}});
  };
  render = () => {
    const lists = this.state.shopping_lists.map( (item) => {
      return (
        <tr><td>{item.created}</td></tr>
      );
    });
    return (
      <div>
        <h1>Shopping Lists</h1>
        <div className="container">
          <button type="button" onClick={this.newList} >+</button>
          <table>
            {lists}
          </table>
        </div>
      </div>
    );
  };
}
