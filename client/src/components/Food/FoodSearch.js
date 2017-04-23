import React from 'react';
import Client from './Client';

const MATCHING_ITEM_LIMIT = 25;

class FoodSearch extends React.Component {
  state = {
    foods: [],
    name: "",
    exists: false, // does the search food already exist?
    units: "kg",
    amount: "",
    cost:"",
    searchValue: ''
  };

  handleSearchChange = (e) => {
    const value = e.target.value;
    this.setState({
      searchValue: value,
      exists: false
    });
    if (value === '') {
      this.setState({ foods: []});
    } else {
      const last_char = value.slice( -1);
      const ndx = parseInt( last_char, 10);
      if( isNaN( ndx)){
        Client.search(value, (foods) => {
          this.setState({ foods: foods.slice(0, MATCHING_ITEM_LIMIT)});
        });
      } else {
        if( typeof this.state.foods[ndx-1] !== "undefined"){
          console.log( "numbered food list:", this.state.foods[ndx-1]);
          this.handleFoodClick( this.state.foods[ndx-1]);
        }
      }
    }
  };

  handleSearchCancel = () => {
    this.setState({ foods: [], searchValue: '',
      name: "", units: "kg", amount: "", cost:"", exists: false
    });
  };

  handleFoodClick = function( food){
    console.log( "food clicked:", food);
    this.setState({ name: food.name, searchValue: food.name, units:food.units, exists:true}, function(){
      console.log( "state:", this.state);
    });
    this.entry_amount.focus();
  };

  handleSearchSelect = () => {
    const food = { name: this.state.searchValue, units: this.state.units, exists:this.state.exists,
      amount: parseFloat( this.state.amount), cost: parseFloat( this.state.cost) };
    this.props.onFoodClick( food);
    this.handleSearchCancel();
    this.search_input.focus();
  };
  handleAmountChange = (e) => {
    this.setState( { amount: e.target.value});
  };
  handleCostChange = (e) => {
    this.setState( { cost: e.target.value});
  };
  // TODO: interesting, text is still highlighted on focus
  handleTextFocus = (e) => {
    // e.target.select();
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

  render() {
    const { foods } = this.state;

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
      <div id='food-search'>
        <div>
          <div className='food-field'>
            <label htmlFor="name_field" className="left-align">Name</label>
            <input type='text' placeholder='Search foods...'
              value={this.state.searchValue} onChange={this.handleSearchChange}
              ref={(search_input) => { this.search_input = search_input;}}/>
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
            <label htmlFor="amount_field">Amount</label>
            <input type='text' name="amount_field" className='entry-narrow'
              value={this.state.amount} onChange={this.handleAmountChange}
              onFocus={this.handleTextFocus}
              ref={(input) => { this.entry_amount = input;}} />
          </div>
          <div className="food-field">
            <label htmlFor="cost_field">Cost</label>
            <input type='text' name="cost_field" className='entry-narrow'
              value={this.state.cost} onChange={this.handleCostChange} />
          </div>
          <div className="food-field">
            <label htmlFor="add_button">&nbsp;</label>
            <button type="button" name="add_button" onClick={this.handleSearchSelect}>+</button>
          </div>
        </div>
        <div className='food-search-table'>
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
    );
  }
}

export default FoodSearch;
