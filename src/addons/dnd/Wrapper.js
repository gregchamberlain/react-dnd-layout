import React from 'react';
import { findDOMNode } from 'react-dom';
import { DragSource } from 'react-dnd';

import { LayoutState, connect } from '../../';

const source = {
  beginDrag(props) {
    return props.layoutState.getItemJS(props.id);
  }
};

const DnDWrapper = Child => {

  const DnD = ({ connectDragSource, isDragging, ...props }) => isDragging ? null : (
    <Child {...props} ref={instance => {
      connectDragSource(findDOMNode(instance))
    }} />
  )

  return connect('layoutState', 'components')(DragSource('Component', source, (conn, monitor) => ({
    connectDragSource: conn.dragSource(),
    isDragging: monitor.isDragging()
  }))(DnD))
};

// const Wrapper = connect('layoutState', 'components')(DragSource('Component', source, (conn, monitor) => ({
//   connectDragSource: conn.dragSource(),
//   isDragging: monitor.isDragging()
// }))(DnDWrapper));

export default DnDWrapper;