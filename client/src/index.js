import React from 'react';
import ReactDOM from 'react-dom';
// import App from './App';
import './index.css';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import './App.css';

import Layout from './components/Layout';
import Shopping from './components/Shopping';
import ShoppingList from './components/ShoppingList';

const app = document.getElementById('root');
ReactDOM.render(
  <Router history={browserHistory}>
    <Route path="/" component={Layout} >
      <IndexRoute component={Shopping} ></IndexRoute>
      <Route path="shoppinglist" name="shoppinglist" component={ShoppingList} ></Route>
    </Route>
  </Router>,
app);
