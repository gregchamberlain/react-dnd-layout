import React, { Component, PropTypes } from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import Image from './components/image';
import Title from './components/title';
import Text from './components/text';

// import Layout, { Wrapper } from '../src';
import Layout from '../src/stateless_layout_container';
import LayoutProvider from '../src/layout_provider';
import { Row, Column } from '../src';
const component = {
  type: 'Column',
  id: 1,
  props: {
    row: false,
    children: []
  }
};

const comps = {
  Text,
  Row,
  Column,
  Image,
  Title,
};


class StatelessExample extends Component {

  render() {
    return (
      <LayoutProvider rootItem={component} components={comps}/>
    );
  }
}

export default StatelessExample;
