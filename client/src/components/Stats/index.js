import React, { Component } from 'react';
import Client from '../Client';
// FIXME: can't we just include this once at top of app index.js?
import '../../concatAll';
import moment from 'moment';
import BarChart from '../BarChart';
import ToolTip from '../ToolTip';

export default class Stats extends Component {
  // static propTypes = {}
  // static defaultProps = {}
  static MATCHING_ITEM_LIMIT = 100;
  state = {
    shopping_lists: [],
    tooltip_text: "",
    tooltip_visible: false,
    tooltip_x :0,
    tooltip_y : 0,
    sort_by: "total"
  };
  componentWillMount = () => {
    Client.getLists( (lists) => {
      this.setState({ shopping_lists: lists.slice(0, this.MATCHING_ITEM_LIMIT)});
    });
  };
  handleAlphaSort = () => {
    this.setState( {sort_by: "alpha"});
  };
  handleTotalSort = () => {
    this.setState( { sort_by: "total"});
  };

  render() {
    const data = this.state.shopping_lists.map( ( list) => {
      return list.selectedFoods.map( (item) => {
        return  { created: list.created, name: item.name};
      });
    }).concatAll();
    let sorted = [];
    if( this.state.sort_by === "alpha"){
      sorted = this.alphaSort( data);
    } else {
      sorted = this.totalSort( data);
    }
    let chart_data = sorted.map( (item) => {
      return { label: item.name, value: item.total};
    });

    const container = { width:960, height:400};
    const tooltip = {display: (this.state.tooltip_visible)?"block":"none",
      top: this.state.tooltip_y, left: this.state.tooltip_x
    };
    const wrapper = {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center"
    }
    return (
      <div style={wrapper}>
        <h1>
          Stats
        </h1>
        <div className="button-bar">
          Sort
          <button type="button" onClick={this.handleAlphaSort}
            className={this.state.sort_by==="alpha"?"button-active":""} >
            Alpha
          </button>
          <button type="button" onClick={this.handleTotalSort}
            className={this.state.sort_by==="total"?"button-active":""} >
            Total
          </button>
        </div>
        <div>
          <BarChart height={container.height} width={container.width} data={chart_data}
            handleMouseEnter={this.handleMouseEnter} handleMouseLeave={this.handleMouseLeave} />
          <ToolTip tip_text={this.state.tooltip_text} pos={tooltip} />
        </div>
      </div>
    );
  }

  calcTotals = ( data) => {
    return data.reduce( function( acc, cur){
      const found = acc.findIndex( function( ele){
        return cur.name === ele.name;
      });
      if( found === -1){
        acc.push( {...cur, total: 1});
      } else {
        const item = acc[found];
        acc[found] = {...item, total: item.total+1};
      }
      return acc;
    }, []);
  };
  alphaSort = ( data) => {
    return this.calcTotals(data).sort( (a,b) => {
      if( a.name > b.name) return 1;
      else if( a.name < b.name) return -1;
      return 0;
    });
  };
  totalSort = ( data) => {
    return this.calcTotals( data).sort( (a,b) => {
      if( a.total > b.total) return 1;
      else if( a.total < b.total) return -1;
      return 0;
    });
  };
  handleMouseEnter = (datarow, x, y) => {
    this.setState( { tooltip_text: datarow.label+":"+datarow.value,
      tooltip_visible:true,
      tooltip_x: x, tooltip_y: y-24});
  };
  handleMouseLeave = () => {
    this.setState( { tooltip_visible: false})
  };
  getTabularData = () => {
    const data = this.state.shopping_lists.map( function( list){
      return list.selectedFoods.map( function( food){
        return { created: list.created, name: food.name, cost: food.cost};
      });
    }).concatAll();
    // TODO: order by date second; format the price; group by name
    data.sort( function( a, b){
      if( a.name > b.name) return 1;
      else if( a.name < b.name) return -1;
      else if( moment( a.created) > moment( b.created)) return 1;
      return 0;
    });
    const rows = data.map( function( item, ndx){
      return (
        <tr key={ndx}><td>{item.name}</td>
          <td>{moment( item.created).format("DD-MMM-YYYY HH:mm")}</td>
          <td className="right-align">{item.cost.toFixed(2)}</td></tr>
      );
    });
    return rows;
  };
}
