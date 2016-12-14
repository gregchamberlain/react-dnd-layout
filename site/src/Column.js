import React from 'react';
import { DropTarget } from 'react-dnd';

const target = {
  drop(props, monitor, component) {
    if (!monitor.didDrop()) {
      console.log('dropped!');

    }
  }
};

const Column = ({ children, connectDropTarget, isOverCurrent }) => connectDropTarget(
  <div style={{display: 'flex', flexDirection: 'column', padding: 15, backgroundColor: isOverCurrent ? 'red' : 'white' }}>
    This is a column!
    {children}
  </div>
);

export default DropTarget('Component', target, (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOverCurrent: monitor.isOver({shallow: true}),
}))(Column);
