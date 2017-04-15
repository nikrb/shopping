import React, { Component } from 'react';
import SelectedFoods from './SelectedFoods';
import FoodSearch from './FoodSearch';
import Client from './Client';

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
  componentWillUnmount = () => {
    Client.postList( { created: this.state.created,
      selectedFoods: this.state.selectedFoods.map( (food) => {
        return { name: food.name, units: food.units,
          amount: food.amount, cost: food.cost};
      })
    });
  };
  removeFoodItem = (itemIndex) => {
    const filteredFoods = this.state.selectedFoods.filter(
      (item, idx) => itemIndex !== idx,
    );
    this.setState({ selectedFoods: filteredFoods });
  };

  addFood = (food) => {
    console.log( "adding food:", food);
    const newFoods = this.state.selectedFoods.concat(food);
    let upd = { selectedFoods: newFoods };
    if( !food.exists){
      upd.exists = true;
      const nf = { name: food.name, units: food.units};
      Client.postFood( nf);
    }
    this.setState( upd);
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
