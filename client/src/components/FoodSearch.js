import React from 'react';
import Client from './Client';

const MATCHING_ITEM_LIMIT = 25;

class FoodSearch extends React.Component {
  state = {
    foods: [],
    name: "",
    unit: "",
    amount: "",
    cost:"",
    showRemoveIcon: false,
    searchValue: '',
  };

  handleSearchChange = (e) => {
    const value = e.target.value;

    this.setState({
      searchValue: value,
    });

    if (value === '') {
      this.setState({
        foods: [],
        showRemoveIcon: false,
      });
    } else {
      this.setState({
        showRemoveIcon: true,
      });

      Client.search(value, (foods) => {
        this.setState({
          foods: foods.slice(0, MATCHING_ITEM_LIMIT),
        });
      });
    }
  };

  handleSearchCancel = () => {
    this.setState({
      foods: [],
      showRemoveIcon: false,
      searchValue: '',
      name: "",
      unit: "",
      amount: "",
      cost:""
    });
  };

  handleFoodClick = function( food){
    console.log( "food clicked:", food);
    this.setState({ name: food.name, searchValue: food.name, unit:food.units}, function(){
      console.log( "state:", this.state);
    });
    this.entry_amount.focus();
  };

  handleSearchSelect = function( food){
    // this.props.onFoodClick( food);
    console.log( "state:", this.state);
    this.handleSearchCancel();
  };
  handleAmountChange = (e) => {
    this.setState( { amount: e.target.value});
  };
  handleCostChange = (e) => {
    this.setState( { cost: e.target.value});
  };
  handleTextFocus = (e) => {
    e.target.select();
  };

  render() {
    const { showRemoveIcon, foods } = this.state;
    const removeIconStyle = showRemoveIcon ? {} : { visibility: 'hidden' };

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
          <input
            type='text'
            placeholder='Search foods...'
            value={this.state.searchValue}
            onChange={this.handleSearchChange}
          />
          <i className='search icon' />
          <i
            className='remove icon'
            onClick={this.handleSearchCancel}
            style={removeIconStyle}
          />
          <select onChange={this.handleUnitChange} value={this.state.unit}>
            <option value="kg">Kg</option>
            <option value='unit'>Unit</option>
          </select>
          <input type='text'
            className='entry-narrow'
            value={this.state.amount}
            onChange={this.handleAmountChange}
            onFocus={this.handleTextFocus}
            ref={(input) => { this.entry_amount = input;}}
          />
          <input type='text'
            className='entry-narrow'
            value={this.state.cost}
            onChange={this.handleCostChange}
          />
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
