import React from 'react';

export default class ListItem extends React.Component {
  handleClick = () => {
    this.props.itemClicked( this.props.item_text);
  }
  render = () => {
    return (
      <li onClick={this.handleClick} >{this.props.item_text}</li>
    );
  }
}
