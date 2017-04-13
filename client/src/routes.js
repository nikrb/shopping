import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import App from './components/App/App';
import Shopping from './components/Shopping';
import About from './components/About';
import NotFound from './components/NotFound';

const Routes = () => (
  <Router history={browserHistory}>
    <Route path="/" component={App} >
      <IndexRoute component={Shopping} ></IndexRoute>
      <Route path="/about" component={About} ></Route>
      <Route path="/notexist" component={NotFound} ></Route>
    </Route>
  </Router>
);
export default Routes;
