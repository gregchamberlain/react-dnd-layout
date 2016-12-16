import React, { Component } from 'react';

import { DnDLayout, LayoutState } from '../../src';

import Column from './Column';
import Row from './Row';

const components = {
  Column,
  Row
};

class Root extends Component {

  constructor(props) {
    super(props);
    this.state = {
      layoutState: new LayoutState()
    };
  }

  onChange = layoutState => {
    this.setState({ layoutState });
  }

  render() {
    return (
      <DnDLayout
        layoutState={this.state.layoutState}
        onChange={this.onChange}
        components={components}
      />
    );
  }

}

export default Root;
