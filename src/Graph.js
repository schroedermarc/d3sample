import React, { Component } from 'react';
import './Graph.scss';
import { init, draw, getFilteredData } from './graph-methods';

export class Graph extends Component {

  margin = { top: 50, right: 50, bottom: 50, left: 50 };
  svgName = 'graph1'


  shouldComponentUpdate = (nextProps, nextState) => {
    const { stateFilter } = nextProps;
    console.log(nextProps);

    getFilteredData(stateFilter).then(data => {
      draw({
        data: data,
        svgName: `#${this.svgName}`,
        margin: this.margin
      })
    });

    return false;
  }


  render() {
    console.log(this.svgName)
    return (
      <div className="graph-container" ref="graph1">
        <svg id={this.svgName}></svg>
      </div>
    )
  }

  componentDidMount = () => {

    console.log(this.props)

    init({
      svg: `#${this.svgName}`,
      margin: this.margin,
      set: this.props.stateFilter
    });
  }
}

export default Graph
