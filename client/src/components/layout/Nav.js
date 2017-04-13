import React from "react";
// TODO: keep link for now
import { IndexLink /*, Link*/ } from "react-router";

import './nav.css';

export default class Nav extends React.Component {
  constructor() {
    super()
    this.state = {
      collapsed: true,
    };
  }

  toggleCollapse() {
    const collapsed = !this.state.collapsed;
    this.setState({collapsed});
  }

  render() {
    const { location } = this.props;
    const { collapsed } = this.state;
    const shoppingClass = location.pathname === "/" ? "active" : "";
    // const shoppingListClass = location.pathname.match( /^\/shifts/) ? "active" : "";
    const navClass = collapsed ? "collapse" : "";

    // note unknown prop onlyActiveOnIndex
    // <li className={featuredClass} onlyActiveOnIndex={true}>

    return (
      // TODO: removed role="navigation"
      // TODO: removed className="navbar-toggle"
      <nav>
        <div>
          <button type="button" onClick={this.toggleCollapse.bind(this)} >
            <span>&#9776;</span>
          </button>
        </div>
        <div className={navClass} >
          <ul className="nav">
            <li className={shoppingClass} >
              <IndexLink to="/" onClick={this.toggleCollapse.bind(this)}>Home</IndexLink>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
};
