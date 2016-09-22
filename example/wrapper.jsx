import React, { Component, PropTypes } from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import { Wrapper } from '../src';

class WrapperExample extends Component {
  render() {
    return (
      <div>
        <Wrapper />
        <Wrapper />
        <Wrapper />
      </div>
    );
  }
}

export default  DragDropContext(HTML5Backend)(WrapperExample);
