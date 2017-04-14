import React from 'react';
import {Redirect} from 'react-router-dom';
import LocalDB from '../LocalDB';
import moment from 'moment';

export default class Shopping extends React.Component {
  state = {
    goShoppingList: false,
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
    console.log( "closing local db");
    LocalDB.close();
  };
  newList = () => {
    this.setState( { goShoppingList: { created: moment(), selectedFoods: []}});
  };
  render = () => {
    if( this.state.goShoppingList){
      console.log( "moving to shopping list with:", this.state.goShoppingList);
      return (
        <Redirect to={{
          pathname:"/list",
          state: { list: this.state.goShoppingList}
        }} />
      );
    }
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
