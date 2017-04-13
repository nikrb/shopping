import React from 'react';
// import { Link } from 'react-router-dom';
// import Footer from '../layout/Footer.js';
import Nav from '../layout/Nav.js';


import './App.css';

export default class App extends React.Component {
  render(){
    const { location } = this.props;
    return (
      <div>
        <header>
          <Nav location={location} />
        </header>
        {this.props.children}
      </div>
    );
  }
}
