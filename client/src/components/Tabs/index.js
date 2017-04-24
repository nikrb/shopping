/**
  *
<Tabs>
  <TabPane>
    tab content
  </TabPane>
</Tabs>
  *
 */
import React from 'react';
import './style.css';

export default class Tabs extends React.Component {
  state = {
    selected: 0
  };
  componentWillMount = () => {
    this.setState( {selected: this.props.selected});
  };
  _renderTitles = () => {
    function labels(child, index) {
      return (
        <li key={index}>
          <a href="#"
            onClick={this.handleClick.bind(this, index)}>
            {child.props.label}
          </a>
        </li>
      );
    }
    return (
      <ul className="tabs_labels">
        {this.props.children.map(labels.bind(this))}
      </ul>
    );
  }
  _renderContent = () => {
    return (
      <div className="tabs_content">
        {this.props.children[this.state.selected]}
      </div>
    );
  };
  handleClick = (index, event) => {
    event.preventDefault();
    this.setState({
      selected: index
    });
  };
  render = () => {
    return (
      <div className="tabs">
        {this._renderTitles()}
        {this._renderContent()}
      </div>
    );
  };
}
