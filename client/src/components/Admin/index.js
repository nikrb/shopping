import React from 'react';
import Client from '../Client';

export default class Admin extends React.Component {
  state = {
    foods : []
  }
  componentWillMount = () => {
    Client.search("", (foods) => {
      this.setState({ foods: foods});
    });
  }
  render = () => {
    const rows = this.state.foods.map( (food, ndx) => {
      return ( <tr key={ndx}><td>{food.name}</td><td className="right-align">food.units</td></tr>);
    });
    return (
      <div>
        <h1>Admin</h1>
        <div className="container">
          <table><thead>
            <tr><th>food</th><th>units</th></tr>
          </thead><tbody>
            {rows}
          </tbody>
          </table>
        </div>
      </div>
    );
  }
}
