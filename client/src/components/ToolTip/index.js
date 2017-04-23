/**
 * usage:
  <ToolTip tip_text={this.state.tooltip_text} pos={tooltip} />
  where pos is visibility, x, y
 */
import React from 'react';
import './style.css';

export default class ToolTip extends React.Component {
  render = () => {
    return (
      <div className="tooltip" style={this.props.pos}>
        {this.props.tip_text}
      </div>
    );
  };
}
