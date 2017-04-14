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
    console.log( "shoppingList mount:", this.props.location);
    const { created, selectedFoods} = this.props.location.state.list;
    console.log( "date created:", created);
    // TODO: can we { ...this.props.location.state} here?
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
