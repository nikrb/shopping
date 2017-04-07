import React, { Component } from 'react';
import SelectedFoods from './components/SelectedFoods';
import FoodSearch from './components/FoodSearch';
import './App.css';

class App extends Component {
  state = {
    selectedFoods: [],
  }

  removeFoodItem = (itemIndex) => {
    const filteredFoods = this.state.selectedFoods.filter(
      (item, idx) => itemIndex !== idx,
    );
    this.setState({ selectedFoods: filteredFoods });
  }

  addFood = (food) => {
    const newFoods = this.state.selectedFoods.concat(food);
    this.setState({ selectedFoods: newFoods });
  }

  render() {
    const { selectedFoods } = this.state;
    return (
      <div className='App'>
        <h1>Shopping</h1>
        <div className='table-wrapper'>
          <FoodSearch
            onFoodClick={this.addFood}
            />
        </div>
        <div className='table-wrapper'>
          <SelectedFoods
            foods={selectedFoods}
            onFoodClick={this.removeFoodItem}
          />
        </div>
      </div>
    );
  }
}

export default App;
