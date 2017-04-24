/**
 * usage:
  <BarChart height={container.height} width={container.width} data={chart_data}
    handleMouseEnter={this.handleMouseEnter} handleMouseLeave={this.handleMouseLeave} />
  mouse handlers report individual bar activity
  handleMouseEnter( {label,value}, x, y)
 * data - format: { label,value}
 */
import React from 'react';
import * as d3 from 'd3';
import XYAxis from './XYAxis';
import './style.css';

export default class BarChart extends React.Component {
  handleMouseEnter = function( data, e){
    e.preventDefault();
    e.stopPropagation();
    this.props.handleMouseEnter( data, e.pageX, e.pageY);
  };
  handleMouseLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    this.props.handleMouseLeave();
  };
  render = () => {
    const {data, width, height} = this.props;
    const margin = {top: 20, right: 30, bottom: 30, left: 40};
    const inner_width = width-(margin.left+margin.right);
    const inner_height = height-(margin.top+margin.bottom);
    const inner_offset = `translate( ${margin.left}, ${margin.top})`;
    const yScale = d3.scaleLinear()
      .domain( [0, d3.max( this.props.data, d => d.value)])
      .range( [inner_height, 0]);
    const xScale = d3.scaleBand()
      .domain( this.props.data.map( (d) => d.label))
      .range( [0, inner_width]);

    const bars = data.map( ( d, ndx) => {
      return (
        <rect key={ndx} x={xScale( d.label)} y={yScale( d.value)}
          width={xScale.bandwidth()-1}
          height={inner_height - yScale(d.value)}
          onMouseEnter={this.handleMouseEnter.bind( this, d)}
          onMouseLeave={this.handleMouseLeave}/>
      );
    });
    return (
      <svg className="chart" width={width} height={height} >
        <g transform={inner_offset}>
          {bars}
        </g>
        <XYAxis scales={{xScale,yScale}} margins={margin} height={height} />
      </svg>
    );
  };
}
