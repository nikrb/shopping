import React, { Component } from 'react';
import SelectedFoods from './Food/SelectedFoods';
import FoodSearch from './Food/FoodSearch';
import Client from './Food/Client';

export default class ShoppingList extends Component {
  state = {
    created: null, // in
    created_field: "", // out
    // date passed in is always valid
    created_valid: true,
    vendor: "", // in
    vendor_field: "", // out (no validation)
    selectedFoods: []
  };
  componentWillMount = () => {
    console.log( "shoppingList mount:", this.props.location);
    const { created, vendor, selectedFoods} = this.props.location.state.list;
    console.log( "date created:", created);
    // TODO: can we { ...this.props.location.state} here?
    this.setState( { created: created, created_field: created,
      vendor: vendor, vendor_field: vendor, selectedFoods: selectedFoods});
  };
  componentWillUnmount = () => {
    Client.postList( { created: this.state.created,
      vendor: this.state.vendor_field,
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
  createdChanged = (e) => {
    const ts = Date.parse( e.target.value);
    if( isNaN( ts)){
      this.setState( { created_field: e.target.value, created_valid: false});
    } else {
      this.setState( { created_field: e.target.value, created: e.target.value,
        created_valid: true});
    }
  };
  vendorChanged = (e) => {
    this.setState( { vendor_field: e.target.value});
  };

  render() {
    const { selectedFoods } = this.state;
    const field_valid = { borderColor: "green" };
    const field_invalid = { borderColor: "red" };
    // space after label
    const vendor_margin = { marginLeft:"10px"};
    // FIXME: className = App  could be why we're having trouble
    return (
      <div>
        <h1>Shopping List</h1>
        <div className="App">
          <label>Date
            <input type="text" style={this.state.created_valid?field_valid:field_invalid}
              value={this.state.created_field} onChange={this.createdChanged} />
          </label>
          <label>Vendor
            <input type="text" value={this.state.vendor_field} style={vendor_margin}
              onChange={this.vendorChanged} />
          </label>
        </div>
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
