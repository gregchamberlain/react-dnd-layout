import React, { Component, PropTypes } from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import Layout, { Draggable } from '../src';

const components = [
  {props: {background: 'red', content: 'a'}},
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
        <Layout components={components.slice(0,2)}/>
        <Layout components={components.slice(2)}/>
      </div>
    );
  }
}

export default  DragDropContext(HTML5Backend)(BasicExample);
