import React, { Component } from 'react';
import { DragSource } from 'react-dnd';

class TestDrag extends Component {
  render() {
    return (
      <div className="drag-test">Test Drag Item!</div>
    );
  }
}

class TestDragContainer extends Component {

  componentDidMount() {
    console.log(this.refs.test);
  }

  render() {
    return (
      <TestDrag ref="test"/>
    );
  } 
}

export default TestDragContainer;