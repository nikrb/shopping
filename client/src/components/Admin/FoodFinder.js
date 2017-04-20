/**
 * TODO: we shouldn't have the button in here me thinx
 */
import React from 'react';
import Client from '../Client';

export default class FoodFinder extends React.Component {
  state = {
    foods: [],
    name: "",
    units: "kg",
    searchValue: ""
  };
  MATCHING_ITEM_LIMIT = 9;

  handleSearchChange = (e) => {
    const value = e.target.value;
    this.setState({
      searchValue: value
    });
    if (value === '') {
      this.setState({ foods: []});
    } else {
      const last_char = value.slice( -1);
      const ndx = parseInt( last_char, 10);
      if( isNaN( ndx)){
        Client.search(value, (foods) => {
          this.setState({ foods: foods.slice(0, this.MATCHING_ITEM_LIMIT)});
        });
      } else {
        if( typeof this.state.foods[ndx-1] !== "undefined"){
          console.log( "numbered food list:", this.state.foods[ndx-1]);
          this.handleFoodClick( this.state.foods[ndx-1]);
        }
      }
    }
  };

  handleFoodClick = function( food){
    console.log( "food clicked:", food);
    this.setState({ name: food.name, searchValue: food.name, units:food.units});
  };
  handleUnitsKeyUp = (e) => {
    switch( e.keyCode){
      case 75: // k
        this.setState( { units: 'kg'});
        break;
      case 85: // u
        this.setState( { units: 'unit'});
        break;
      default:
        break;
    }
  };
  handleUnitsChange = (e) => {
    this.setState( { units : e.target.value});
  };
  handleFoodUpdate = () => {
    this.props.handleFoodUpdate( {name: this.state.name,
      new_name:this.state.searchValue, units: this.state.units});
  };
  render = () => {
    const {foods} = this.state;
    // FIXME: using ()=>{} creates a new function for onClick every render
    // so just use bind(this, param) syntax
    // try factoring FoodItem out
    const foodRows = foods.map((food, idx) => (
      <tr
        key={idx}
        onClick={this.handleFoodClick.bind(this, food)}
      >
        <td>{idx+1}</td>
        <td className="left-align hand-select">{food.name}</td>
        <td>{food.units}</td>
      </tr>
    ));

    return (
      <div className="food-finder-wrapper">
        <div className="food-finder">
          <div className='food-field'>
            <label htmlFor="name_field" className="left-align">Name</label>
            <input type='text' placeholder='Search foods...'
              value={this.state.searchValue} onChange={this.handleSearchChange} />
          </div>
          <div className="food-field">
            <label htmlFor="units_field">Units</label>
            <select name="units_field" onKeyUp={this.handleUnitsKeyUp}
              value={this.state.units} onChange={this.handleUnitsChange} >
              <option value="kg">Kg</option>
              <option value='unit'>Unit</option>
            </select>
          </div>
          <div className="food-field">
            <label htmlFor="add_button">&nbsp;</label>
            <button type="button" name="add_button" onClick={this.handleFoodUpdate}>
              {this.props.buttonLabel}
            </button>
          </div>
        </div>
        <div>
          <div className='food-finder-table'>
            <table>
              <thead>
                <tr>
                  <th className="entry-narrow">&nbsp;</th>
                  <th className="left-align">Description</th>
                  <th>Units</th>
                </tr>
              </thead>
              <tbody>
                {foodRows}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };
}
