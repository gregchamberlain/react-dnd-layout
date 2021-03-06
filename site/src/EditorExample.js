import React, { Component } from 'react';

import { Editor, StaticLayout, LayoutState, Row, Column } from '../../src';

const components = {
  Column,
  Row
};

class MyComponent extends Component {

  constructor(props) {
    super(props);
    this.state = {
      layoutState: new LayoutState()
    };
    this.handleLayoutChange = this.handleLayoutChange.bind(this);
  }

  handleLayoutChange(layoutState) {
    this.setState({ layoutState });
  }

  render() {
    return (
      <Editor
        layoutState={this.state.layoutState}
        onChange={this.handleLayoutChange}
        components={components}
      />
    );
  }

}

export default MyComponent;
