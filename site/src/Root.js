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
      layoutState: new LayoutState(),
      locked: false
    };
  }

  onChange = layoutState => {
    this.setState({ layoutState });
  }

  toggleLock = e => {
    this.setState({ locked: !this.state.locked });
  }

  render() {
    return (
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, overflow: 'auto'}}>
        <div>
          <button onClick={this.toggleLock}>{this.state.locked ? 'Unlock' : 'Lock'}</button>
        </div>
        <div style={{position: 'relative', height: '100%'}}>
          <DnDLayout
            readOnly={this.state.locked}
            layoutState={this.state.layoutState}
            onChange={this.onChange}
            components={components}
          />
        </div>
      </div>
    );
  }

}

export default Root;
