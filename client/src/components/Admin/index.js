import React from 'react';
import FoodFinder from './FoodFinder';
import Client from '../Client';

export default class Admin extends React.Component {
  selected_food = null;
  handleFoodSaveClick = () => {
    console.log( "admin food updated:", food);
    // TODO: really should error check
    Client.updateFood( { name: food.name, units: food.units,
      new_name: food.new_name}
    );
  };
  handleFoodUpdate = (food) => {
    this.selected_food = food;
  };
  render = () => {
    return (
      <div>
        <h1>Admin</h1>
        <FoodFinder handleFoodUpdate={this.handleFoodUpdate} />

        <div className="food-field">
          <label htmlFor="add_button">&nbsp;</label>
          <button type="button" name="add_button" onClick={this.handleFoodSaveClick}>
            "Save"
          </button>
        </div>
      </div>
    );
  }
}
