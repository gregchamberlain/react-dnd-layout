import React, { Component, PropTypes } from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

// import Layout, { Wrapper } from '../src';
import Layout from '../src/stateless_layout_container';
import LayoutProvider from '../src/layout_provider';
import { RowLayout, ColumnLayout } from '../src';
const Text = ({children}) => <div>{children}</div>;
Text.defaultProps = {
  children: 'asdasdasd'
};
const component = {
  type: 'Layout',
  id: 1,
  props: {
    row: false,
    children: [
      {type: 'Text', id: 2, props: {children: "a"}},
      {type: 'Text', id: 3, props: {children: "b"}},
      {type: 'Text', id: 4, props: {children: "c"}},
      {type: 'Layout', id: 5, props: { row: true, children: [
        {type: 'Text', id: 6, props: {children: "d"}},
        {type: 'Text', id: 7, props: {children: "e"}},
        {type: 'Layout', id: 8, props: {row: false, children: [
          {type: 'Text', id: 9, props: {children: "f"}},
          {type: 'Text', id: 10, props: {children: "g"}},
          ]}},
        ]},
      },
    ]
  }
};

const comps = {
  Text,
  Layout,
  RowLayout,
  ColumnLayout
};


class StatelessExample extends Component {

  render() {
    return (
      <LayoutProvider rootItem={component} components={comps}/>
    );
  }
}

export default StatelessExample;
