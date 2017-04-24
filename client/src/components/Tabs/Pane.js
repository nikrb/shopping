import React from 'react';

export default class Pane extends React.Component {
  render = () => {
    return (
      <div>
        {this.props.children}
      </div>
    );
  };
}
