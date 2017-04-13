import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import App from './components/App/App';
import Shopping from './components/Shopping';
import ShoppingList from './components/ShoppingList';
import About from './components/About';
import NotFound from './components/NotFound';

// import Routes from './routes';

import './index.css';

ReactDOM.render(
  <Router history={browserHistory}>
    <Route path="/" component={App} >
      <IndexRoute component={Shopping} ></IndexRoute>
      <Route path="/list" component={ShoppingList} ></Route>
      <Route path="/about" component={About} ></Route>
      <Route path="/notexist" component={NotFound} ></Route>
    </Route>
  </Router>,
  document.getElementById('root')
);
