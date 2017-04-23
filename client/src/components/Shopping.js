import React from 'react';
import {Redirect} from 'react-router-dom';
import Client from './Food/Client';
import ListItem from './Food/ListItem';
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
  deleteClicked = ( item_id) => {
    console.log( "delete clicked for id:", item_id);
    const newlist = this.state.shopping_lists.filter( (list) => {
      return list.created !== item_id;
    });
    this.setState( { shopping_lists: newlist});
    Client.deleteList( item_id);
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
      console.log( "map item:", item);
      const total = item.selectedFoods.reduce( ( acc, cur) => {
        return acc + cur.cost;
      }, 0.0);
      const txt = moment( item.created).format( "DD-MMM-YYYY HH:mm") +
        " - "+item.vendor+" : £"+total.toFixed(2);
      return (
        <ListItem key={ndx} itemClicked={this.listClicked}
          item_id={item.created} item_text={txt} deleteClicked={this.deleteClicked} />
      );
    });
    const outer = { display:"flex", flexDirection:"row", justifyContent: "center"}
    const wrapper = { display: "flex", flexDirection: "column",
      alignItems: "center"
    };
    const container = {
      padding: "20px",
      border: "1px solid rgba( 0,0,0,0.2)",
      borderRadius: "10px",
      backgroundColor: "rgba( 127,127,255,0.1)"
    }
    return (
      <div style={outer}>
        <div style={wrapper}>
          <h1>Shopping Lists</h1>
          <div style={container}>
            <button type="button" onClick={this.newList} >New</button>
            <ul>
              {lists}
            </ul>
          </div>
        </div>
      </div>
    );
  };
}
