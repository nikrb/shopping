import React, { Component } from 'react';
import LocalDB from '../LocalDB';
import SelectedFoods from './SelectedFoods';
import FoodSearch from './FoodSearch';

export default class ShoppingList extends Component {
  state = {
    created: null,
    selectedFoods: [],
  };
  componentWillMount = () => {
    console.log( "at shopping list mount");
    console.log( this.props.location);
    const { created, selectedFoods} = this.props.location.state;
    this.setState( { created: created, selectedFoods: selectedFoods});
  };
  removeFoodItem = (itemIndex) => {
    const filteredFoods = this.state.selectedFoods.filter(
      (item, idx) => itemIndex !== idx,
    );
    this.setState({ selectedFoods: filteredFoods });
  };

  addFood = (food) => {
    const newFoods = this.state.selectedFoods.concat(food);
    this.setState({ selectedFoods: newFoods });
    console.log( "date created:", this.state.created.format( 'DD-MMM-YYYY HH:mm'));
  };

  render() {
    const { selectedFoods } = this.state;
    return (
      <div>
        <h1>Shopping List</h1>
        <div className='App'>
          <div className='container'>
            <FoodSearch
              onFoodClick={this.addFood}
              />
          </div>
          <div className='container'>
            <SelectedFoods
              foods={selectedFoods}
              onFoodClick={this.removeFoodItem}
            />
          </div>
        </div>
      </div>
    );
  }
}
