
import React from 'react';
import Client from './Client';

const MATCHING_ITEM_LIMIT = 25;

class FoodSearch extends React.Component {
  state = {
    foods: [],
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
    });
  };

  handleFoodClick = function( food){
    this.props.onFoodClick( food);
    this.handleSearchCancel();
  };

  render() {
    const { showRemoveIcon, foods } = this.state;
    const removeIconStyle = showRemoveIcon ? {} : { visibility: 'hidden' };

    // TODO: using ()=>{} creates a new function for onClick every render
    // so just use bind(this, param) syntax
    // try factoring FoodItem out
    const foodRows = foods.map((food, idx) => (
      <tr
        key={idx}
        onClick={this.handleFoodClick.bind(this, food)}
      >
        <td>{food.name}</td>
        <td className='right aligned'>{food.units}</td>
      </tr>
    ));

    return (
      <div id='food-search'>
        <table>
          <thead>
            <tr>
              <th colSpan='5'>
                <div>
                  <div>
                    <input
                      type='text'
                      placeholder='Search foods...'
                      value={this.state.searchValue}
                      onChange={this.handleSearchChange}
                    />
                    <i className='search icon' />
                  </div>
                  <i
                    className='remove icon'
                    onClick={this.handleSearchCancel}
                    style={removeIconStyle}
                  />
                </div>
              </th>
            </tr>
            <tr>
              <th>Description</th>
              <th>Units</th>
            </tr>
          </thead>
          <tbody>
            {foodRows}
          </tbody>
        </table>
      </div>
    );
  }
}

export default FoodSearch;
