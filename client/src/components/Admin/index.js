import React from 'react';
import FoodFinder from './FoodFinder';
import Client from '../Client';

export default class Admin extends React.Component {
  handleFoodUpdate = (food) => {
    console.log( "admin food updated:", food);
    // TODO: really should error check
    Client.updateFood( { name: food.name, units: food.units,
      new_name: food.new_name}
    );
  };
  render = () => {
    return (
      <div>
        <h1>Admin</h1>
        <FoodFinder handleFoodUpdate={this.handleFoodUpdate}
          buttonLabel="Save"/>
      </div>
    );
  }
}
