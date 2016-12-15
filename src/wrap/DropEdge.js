import React from 'react';
import { DropTarget } from 'react-dnd';

const edgeTarget = {
  drop(props, monitor) {
    if (!monitor.didDrop()) {
      props.onDrop(props.pos === 'left' || props.pos === 'top' ? 0 : 1, monitor.getItem());
    }
  }
};

const DropEdge = ({ connectDropTarget, style, ...props }) => connectDropTarget(
  <div style={{...style, ...stylesCalc(props)}} />
);

const stylesCalc = ({ pos, isOverCurrent }) => ({
  borderLeft: pos === 'left' && isOverCurrent ? '3px solid blue' : null,
  borderRight: pos === 'right' && isOverCurrent ? '3px solid blue' : null,
  borderTop: pos === 'top' && isOverCurrent ? '3px solid blue' : null,
  borderBottom: pos === 'bottom' && isOverCurrent ? '3px solid blue' : null,
});

export default DropTarget('Component', edgeTarget, (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOverCurrent: monitor.isOver({shallow: true})
}))(DropEdge);
