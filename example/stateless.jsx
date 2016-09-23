import React, { Component, PropTypes } from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import Layout, { Wrapper } from '../src';

import { item } from '../src/redux/schema';
import { mergeItems } from '../src/redux/utils';
import { normalize } from 'normalizr';

const component = {
  type: 'Layout',
  id: 1,
  props: {
    row: false
  },
  items: [
    {type: 'div', id: 2, props: {children: "a"}},
    {type: 'div', id: 3, props: {children: "b"}},
    {type: 'div', id: 4, props: {children: "c"}},
    {type: 'Layout', id: 5, props: { row: true }, items: [
      {type: 'div', id: 6, props: {children: "d"}},
      {type: 'div', id: 7, props: {children: "e"}},
    ]}
  ]
};

const items = normalize(component, item).entities.items;
// console.log(items[1]);
console.log(mergeItems(items, 1));

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
