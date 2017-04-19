import React, { Component } from 'react';
import Client from '../Client';
// FIXME: can't we just include this once at top of app index.js?
import '../../concatAll';
import moment from 'moment';

// import './style.css';

export default class Stats extends Component {
  // static propTypes = {}
  // static defaultProps = {}
  static MATCHING_ITEM_LIMIT = 100;
  state = {
    shopping_lists: []
  };
  componentWillMount = () => {
    Client.getLists( (lists) => {
      this.setState({ shopping_lists: lists.slice(0, this.MATCHING_ITEM_LIMIT)});
    });
  };

  render() {
    // lets output each food with the dates bought and price paid
    // [{ name, date, price}]
    // [{ date, [{name, units, amount, cost}]} ]
    const data = this.state.shopping_lists.map( function( list){
      return list.selectedFoods.map( function( food){
        return { created: list.created, name: food.name, cost: food.cost};
      });
    }).concatAll();
    // TODO: order by date second; format the price; group by name
    data.sort( function( a, b){
      if( a.name > b.name) return 1;
      else if( a.name < b.name) return -1;
      return 0;
    });
    const rows = data.map( function( item, ndx){
      return (
        <tr key={ndx}><td>{item.name}</td>
          <td>{moment( item.created).format("DD-MMM-YYYY HH:mm")}</td>
          <td>{item.cost}</td></tr>
      );
    });

    return (
      <div>
        <h1>
          Stats
        </h1>
        <div>
          <table><thead>
            <tr><th>food</th><th>purchase dates</th><th>price</th></tr>
          </thead><tbody>
            {rows}
          </tbody>
          </table>
        </div>
      </div>
    );
  }
}
