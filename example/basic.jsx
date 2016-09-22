import React, { Component, PropTypes } from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import Layout, { Draggable } from '../src';

const components = [
  {props: {background: 'red'}},
  {props: {background: 'green'}},
  {props: {background: 'blue'}},
  {props: {background: 'pink'}},
  {props: {background: 'yellow'}},
];

class BasicExample extends Component {
  render() {
    return (
      <div>
        <div style={{display: 'flex'}}>
          <Draggable background="magenta"/>
          <Draggable background="cyan" />
          <Draggable background="grey" />
        </div>
        <Layout components={components}/>
      </div>
    );
  }
}

export default  DragDropContext(HTML5Backend)(BasicExample);
