import React from 'react';
import { findDOMNode } from 'react-dom';
import { DragSource } from 'react-dnd';
import hoistNonReactStatic from 'hoist-non-react-statics';

import { LayoutState, connect } from '../../';

const source = {
  beginDrag(props) {
    return props.layoutState.getItemJS(props.id);
  }
};

const DnDWrapper = (WrappedComponent, displayName) => {

  const DnD = ({ connectDragSource, isDragging, pseudoRef, ...props }) => isDragging ? null : (
    <WrappedComponent {...props} pseudoRef={instance => {
      connectDragSource(findDOMNode(instance));
      pseudoRef(instance);
    }} />
  )

  DnD.displayName = `DnDWrapper(${displayName})`
  hoistNonReactStatic(DnD, WrappedComponent);

  return connect('layoutState', 'components')(DragSource('Component', source, (conn, monitor) => ({
    connectDragSource: conn.dragSource(),
    isDragging: monitor.isDragging()
  }))(DnD))

};

export default DnDWrapper;