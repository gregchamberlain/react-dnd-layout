import React, { Component, PropTypes } from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import Draggable from './draggabe';
import Layout from '../src';

class BasicExample extends Component {
  render() {
    return (
      <div style={{display: 'flex'}}>
        <Draggable />
        <Layout />
      </div>
    );
  }
}

export default  DragDropContext(HTML5Backend)(BasicExample);
