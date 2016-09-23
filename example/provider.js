import React, { Component, PropTypes } from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

// import Layout, { Wrapper } from '../src';
import Layout from '../src/stateless_layout_container';
import LayoutProvider from '../src/layout_provider';

import { item } from '../src/redux/schema';
import { mergeItems } from '../src/redux/utils';
import { normalize } from 'normalizr';
const Text = ({children}) => <div>{children}</div>;
const component = {
  type: 'Layout',
  id: 1,
  props: {
    row: false
  },
  items: [
    {type: 'Text', id: 2, props: {children: "a"}},
    {type: 'Text', id: 3, props: {children: "b"}},
    {type: 'Text', id: 4, props: {children: "c"}},
    {type: 'Layout', id: 5, props: { row: true }, items: [
      {type: 'Text', id: 6, props: {children: "d"}},
      {type: 'Text', id: 7, props: {children: "e"}},
    ]}
  ]
};

const comps = {
  Text,
  Layout
};


class StatelessExample extends Component {

  render() {
    return (
      <LayoutProvider rootItem={component} components={comps}/>
    );
  }
}

export default StatelessExample;
