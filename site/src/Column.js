import React from 'react';
import { DropTarget } from 'react-dnd';

const target = {
  drop(props, monitor, component) {
    if (!monitor.didDrop()) {
      props.onAddItem(props.children.length, monitor.getItem());
    }
  }
};

const Column = ({ id, children, connectDropTarget, isOverCurrent }) => connectDropTarget(
  <div style={{display: 'flex', flexDirection: 'column', padding: 15, backgroundColor: isOverCurrent ? 'red' : 'white' }}>
    This is a column! ID: {id}
    {children}
  </div>
);

const ColumnContainer = DropTarget('Component', target, (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOverCurrent: monitor.isOver({shallow: true}),
}))(Column);

ColumnContainer.LayoutDirection = 'column';

export default ColumnContainer;
