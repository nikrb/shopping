import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import Shopping from '../Shopping';
import ShoppingList from '../ShoppingList';
import Stats from '../Stats';
import Admin from '../Admin';
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
              <li><Link to="/stats">Stats</Link></li>
              <li><Link to="/admin">Admin</Link></li>
              <li><Link to="/about">About</Link></li>
            </ul>
          </div>

          <hr/>

          <Route exact path="/" component={Shopping}/>
          <Route path="/list" component={ShoppingList} />
          <Route path="/stats" component={Stats} />
          <Route path="/admin" component={Admin} />
          <Route path="/about" component={About} />
        </div>
      </Router>
    );
  };
}
