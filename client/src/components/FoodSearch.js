import React from 'react';
import Client from './Client';

const MATCHING_ITEM_LIMIT = 25;

class FoodSearch extends React.Component {
  state = {
    foods: [],
    name: "",
    units: "kg",
    amount: "",
    cost:"",
    searchValue: ''
  };

  handleSearchChange = (e) => {
    const value = e.target.value;
    this.setState({
      searchValue: value,
    });
    if (value === '') {
      this.setState({ foods: []});
    } else {
      Client.search(value, (foods) => {
        this.setState({ foods: foods.slice(0, MATCHING_ITEM_LIMIT)});
      });
    }
  };

  handleSearchCancel = () => {
    this.setState({ foods: [], searchValue: '',
      name: "", units: "kg", amount: "", cost:""
    });
  };

  handleFoodClick = function( food){
    console.log( "food clicked:", food);
    this.setState({ name: food.name, searchValue: food.name, units:food.units}, function(){
      console.log( "state:", this.state);
    });
    this.entry_amount.focus();
  };

  handleSearchSelect = () => {
    const food = { name: this.state.searchValue, units: this.state.units,
      amount: parseFloat( this.state.amount), cost: parseFloat( this.state.cost) };
    console.log( "add food:", food);
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
  handleTextFocus = (e) => {
    // e.target.select();
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
        <td className="left-align hand-select">{food.name}</td>
        <td>{food.units}</td>
      </tr>
    ));

    return (
      <div id='food-search'>
        <div>
          <input type='text' placeholder='Search foods...'
            value={this.state.searchValue} onChange={this.handleSearchChange}
            ref={(search_input) => { this.search_input = search_input;}}/>
          <select onChange={this.handleUnitChange} value={this.state.units}>
            <option value="kg">Kg</option>
            <option value='unit'>Unit</option>
          </select>
          <input type='text' className='entry-narrow' value={this.state.amount}
            onChange={this.handleAmountChange} onFocus={this.handleTextFocus}
            ref={(input) => { this.entry_amount = input;}} />
          <input type='text' className='entry-narrow'
            value={this.state.cost} onChange={this.handleCostChange} />
          <button type="button" onClick={this.handleSearchSelect}>+</button>
        </div>
        <div className='food-search-table'>
          <table>
            <thead>
              <tr>
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
