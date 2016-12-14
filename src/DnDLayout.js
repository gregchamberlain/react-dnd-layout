import React, { Component } from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

class DnDLayout extends Component {

  render() {
    return (
      <div>
        Welcome to React DnD Layout!
      </div>
    );
  }
  
}

export default DragDropContext(HTML5Backend)(DnDLayout);
