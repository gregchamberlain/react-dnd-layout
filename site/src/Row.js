import React from 'react';
import { DropTarget } from 'react-dnd';

const target = {
  drop(props, monitor, component) {
    if (!monitor.didDrop()) {
      props.onAddItem(props.children.length, monitor.getItem());
    }
  }
};

const Row = ({ id, children, connectDropTarget, isOverCurrent }) => connectDropTarget(
  <div style={{display: 'flex', flexDirection: 'row', padding: 15, backgroundColor: isOverCurrent ? 'red' : 'white' }}>
    This is a Row! ID: {id}
    {children}
  </div>
);

export default DropTarget('Component', target, (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOverCurrent: monitor.isOver({shallow: true}),
}))(Row);
