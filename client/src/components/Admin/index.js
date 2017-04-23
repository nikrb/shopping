import React from 'react';
import FoodFinder from '../Food/FoodFinder';
import Client from '../Food/Client';

export default class Admin extends React.Component {
  selected_food = null;
  handleFoodSaveClick = () => {
    console.log( "admin food updated:", this.selected_food);
    // TODO: really should error check
    Client.updateFood( { name: this.selected_food.name,
      units: this.selected_food.units,
      new_name: this.selected_food.new_name}
    );
  };
  handleFoodUpdate = (food) => {
    this.selected_food = food;
  };
  render = () => {
    const container = { display: "flex", flexDirection: "column"};
    const styles = {
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "baseline"
    };
    return (
      <div style={container}>
        <h1>Admin</h1>
        <div style={styles}>
          <FoodFinder handleFoodUpdate={this.handleFoodUpdate} />

          <div>
            <label htmlFor="add_button">&nbsp;</label>
            <button type="button" name="add_button" onClick={this.handleFoodSaveClick}>
              Save
            </button>
          </div>
        </div>
      </div>
    );
  }
}
