import React from 'react';
import {Redirect} from 'react-router-dom';
import Client from './Client';
import ListItem from './ListItem';
import moment from 'moment';

export default class Shopping extends React.Component {
  MATCHING_ITEM_LIMIT = 25;
  state = {
    goShoppingList: false,
    selectedList : null,
    shopping_lists: []
  };
  componentWillMount = () => {
    Client.getLists( (lists) => {
      this.setState({ shopping_lists: lists.slice(0, this.MATCHING_ITEM_LIMIT)});
    });
  };
  componentWillUnmount = () => {

  };
  newList = () => {
    this.setState( { goShoppingList: true,
      selectedList: { created: new Date(), selectedFoods: []}
    });
  };
  listClicked = ( item_id) => {
    console.log( "list clicked:", item_id);
    if( this.state.shopping_lists.length ){
      console.log( "first list created:", this.state.shopping_lists[0].created);
    }
    const selected_list = this.state.shopping_lists.find( ( list) => {
      return list.created === item_id;
    });
    console.log( "edit list:", selected_list);
    if( selected_list){
      this.setState( { goShoppingList: true,
        selectedList: selected_list
      });
    } else {
      console.error( "couldn't find shopping list created on:", item_id);
    }
  };
  render = () => {
    if( this.state.goShoppingList){
      console.log( "moving to shopping list with:", this.state.selectedList);
      return (
        <Redirect to={{
          pathname:"/list",
          state: { list: this.state.selectedList}
        }} />
      );
    }
    const lists = this.state.shopping_lists.map( (item, ndx) => {
      const dt = moment( item.created).format( "DD-MMM-YYYY HH:mm");
      return (
        <ListItem key={ndx} itemClicked={this.listClicked}
          item_id={item.created} item_text={dt} />
      );
    });
    return (
      <div>
        <h1>Shopping Lists</h1>
        <div className="container">
          <button type="button" onClick={this.newList} >New</button>
          <ul>
            {lists}
          </ul>
        </div>
      </div>
    );
  };
}
