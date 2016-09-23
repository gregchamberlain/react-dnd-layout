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

class BasicExample extends Component {
  render() {
    return (
      <Layout>
        <Layout row id="1">
          <Layout id="10">
            <div style={{color: 'white' }} id="2">a</div>
            <div style={{color: 'white' }} id="3">b</div>
          </Layout>
          <div style={{color: 'white' }} id="4">c</div>
        </Layout>
        <Layout row id="5">
          <div style={{color: 'white' }} id="6">d</div>
          <div style={{color: 'white' }} id="7">e</div>
          <div style={{color: 'white' }} id="8">f</div>
        </Layout>
        <Layout row id="9">

        </Layout>
      </Layout>
    );
  }
}

export default  DragDropContext(HTML5Backend)(BasicExample);
