import React, { Component, PropTypes } from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import Layout, { Wrapper } from '../src';

const component = {
  type: 'Layout',
  id: 1,
  props: {
    row: false
  },
  children: [

  ]
};

const components = [
  <div id="1">Hello</div>,
  <div id="2">Hola</div>,
  <div id="3">Hooooya</div>,
  <div id="4">Cyaaaa</div>,
  <Layout id="5"></Layout>
];

class StatelessExample extends Component {
  constructor(props) {
    super(props);
    this.state = {
      a: components.slice(0,2),
      b: components.slice(2)
    };
  }

  update = name => items => {
    this.setState({[name]: items});
  }

  render() {
    return (
      <div>
        <Layout items={this.state.a} onChange={this.update('a')} row/>
        <div style={{height: 50}}></div>
        <Layout items={this.state.b} onChange={this.update('b')}/>
      </div>
    );
  }
}

export default  DragDropContext(HTML5Backend)(StatelessExample);
