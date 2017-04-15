import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import Shopping from '../Shopping';
import ShoppingList from '../ShoppingList';
import About from '../About';

import './App.css';

export default class App extends React.Component {
  render = () => {
    return (
      <Router>
        <div>
          <div className="nav">
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About</Link></li>
            </ul>
          </div>

          <hr/>

          <Route exact path="/" component={Shopping}/>
          <Route path="/list" component={ShoppingList} />
          <Route path="/about" component={About} />
        </div>
      </Router>
    );
  };
}
