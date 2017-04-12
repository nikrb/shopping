import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import App from './components/App/App';
import Shopping from './components/Shopping';
import About from './components/About';
import NotFound from './components/NotFound';

const Routes = () => (
  <Router>
    <div>
      <Route path="/" component={App} />
      <Route path="/" component={Shopping} />
      <Route path="/about" component={About} />
      <Route path="/notexist" component={NotFound} />
    </div>
  </Router>
);
export default Routes;
